/**
 *
 * @param webix_with_header
 */
function initHybridPage(webix_with_header, refine_url) {

  webix.proxy.look = {
    $proxy: true,

    load: function(view, callback, details) {
      var state = view.getState();
      var orderField;

      var lookMetaData = view._settings.lookMetaData;
      var columnsMetaData = view._settings.columnsMetaData;
      var DATA = view._settings.DATA;
      var search = view._settings.search;

      var count = details ? details.count : Math.max(count, (view._settings.datafetch||view._settings.loadahead||0));
      var start = details ? details.start : 0;

      if (start === 0) {
        view.clearAll();
      }
      if (state.sort) {
        for (var i in columnsMetaData.children) {
          if (MDSCommon.getPathName(columnsMetaData.children[i].path) === state.sort.id) {
            orderField = MDSCommon.findValueByName(columnsMetaData.children[i].fields, 'value');
            break;
          }
        }
      }

      var filter = {};
      for (var columnID in state.filter) {
        if (MDSCommon.isBlank(state.filter[columnID])) {
          continue;
        }
        for (var k in columnsMetaData.children) {
          if (MDSCommon.getPathName(columnsMetaData.children[k].path) === columnID) {
            var filterField = MDSCommon.findValueByName(columnsMetaData.children[k].fields, 'value');
            filter[filterField] = state.filter[columnID].toLowerCase();
            break;
          }
        }
      }

      Mydataspace.request('entities.get', MDSCommon.extend(DATA, {
        path: MDSCommon.findValueByName(lookMetaData.fields, 'path'),
        children: true,
        limit: count,
        offset: start,
        orderChildrenBy: orderField ? orderField + ' ' + state.sort.dir : undefined,
        filter: filter,
        search: search
      })).then(function(rowsData) {
        var rows = rowsData.children.map(function(rowData) {
          var ret = { id: MDSCommon.getPathName(rowData.path) };
          for (var i in columnsMetaData.children) {
            var column = columnsMetaData.children[i];
            var field = MDSCommon.findValueByName(column.fields, 'value');
            ret[MDSCommon.getPathName(column.path)] = MDSCommon.findValueByName(rowData.fields, field);
          }
          return ret;
        });

        rows.pos = start;
        rows.total_count = rowsData.total == null ? rowsData.numberOfChildren : rowsData.total;

        for (var k in callback[k]) {
          // text, response, loader
          if (callback[k] && callback[k].before) {
            callback[k].before.call(view, '', rows, -1);
          }
        }

        for (var k in callback) {
          // text, response, loader
          if (callback[k] && callback[k].success) {
            callback[k].success.call(view, '', rows, -1);
          }
        }
      });
    }
  };

  $(function() {
    // Get Started large button
    $('#sub_footer__button').popover({
      placement: 'top',
      html : true,
      trigger: 'focus',
      content: function() {
        return $('#signin_popover').html();
      }
    });
    $('#import_data_modal').on('show.bs.modal', function () {
      document.getElementById('import_data_modal__refine__waiting_cloak').style.display = 'block';

      document.getElementById('import_data_modal__refine').src = refine_url;
      setTimeout(function() {
        document.getElementById('import_data_modal__refine__waiting_cloak').style.display = 'none';
      }, 3000);
    });

  });

  window.addEventListener('message', function(e) {
    if (e.data.message === 'openRefineImport') {
      switch (e.data.stage) {
        case 'getTargetEntity':
          e.source.postMessage({
            message: 'targetEntity',
            openRefineImportEntity: typeof openRefineImportEntity === 'undefined' ? {} : openRefineImportEntity

          }, '*');
          if (typeof openRefineImportEntity !== 'undefined') {
            delete openRefineImportEntity;
          }
          break;
        case 'finished':
          $('#import_data_modal').modal('hide');
          UI.entityTree.refresh();
          if (typeof openRefineImportEntity !== 'undefined') {
            delete openRefineImportEntity;
          }
          //if (Identity.dataFromId(UI.entityTree.getCurrentId).root !== e.data.root) {
          //  UI.entityTree.setCurrentId(Identity.idFromData({ root: e.data.root, path: '' }));
          //} else {
          //  UI.entityList.refreshData();
          //}
          break;
        case 'created': // Open Refine finished his work
          document.getElementById('import_data_modal__refine').src =
            '/finish-import.html?id=' + e.data.id +
            '&projectID=' + e.data.projectID +
            '&header=' + encodeURIComponent(JSON.stringify(e.data.header));
          break;
      }
    }
  });

  $(window).on('hashchange', function() {
    var isEmptyHash = window.location.hash == null ||
      window.location.hash === '' ||
      window.location.hash === '#';

    if (isEmptyPathnameIgnoreLanguage(window.location.pathname) && !isEmptyHash && document.getElementById('webix').style.display === 'none') {
      document.getElementById('bootstrap').style.display = 'none';
      document.getElementById('webix').style.display = 'block';
    }
  });

  //
  // Init MyDataSpace
  //

  webix.codebase = "/vendor/";

  Mydataspace.on('connected', function() {
    UI.initConnection(webix_with_header);
    if (!isValidJWT(localStorage.getItem('authToken'))) {
      UI.pages.refreshPage('data', true);
    }
  });

  Mydataspace.authProviders.facebook.title = STRINGS.CONNECT_TO_FACEBOOK;
  Mydataspace.authProviders.google.title = STRINGS.CONNECT_TO_GOOGLE;
  UI.render(webix_with_header);
  if (!Mydataspace.connected) {
    Mydataspace.connect();
  }

  //
  // Init Markdown renderer
  //
  md = new Remarkable({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed
    highlight: function (/*str, lang*/) { return ''; }
  });
}
