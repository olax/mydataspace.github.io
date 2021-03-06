/**
 *
 * @param options
 */
function initRootPage(options) {

  var API_URL = options.api_url;
  var CDN_URL = options.cdn_url;
  var SEARCH_FOUND_PREFIX = options.search_found_prefix;
  var SEARCH_FOUND_ITEMS_SUFFIX = options.search_found_items_suffix;
  var SEARCH_NO_RESULTS = options.search_no_results;
  var language = options.language;
  var lang = getURLLanguagePrefix(language);
  var DATA = getRequestFromLocation(window.location);
  var URL_TABS = {
    views: 'VIEW_TAB_VIEW_LABEL',
    comments: 'VIEW_TAB_COMMENTS_LABEL',
    data: 'VIEW_TAB_EXPLORE_LABEL',
    '': 'VIEW_TAB_README_LABEL'
  };
  var TABS = {
    VIEW_TAB_README_LABEL: 'root__about',
    VIEW_TAB_VIEW_LABEL: 'root__looks',
    VIEW_TAB_COMMENTS_LABEL: 'root__comments',
    VIEW_TAB_EXPLORE_LABEL: ''
  };


  if (['search', 'datasources'].indexOf(DATA.root) >= 0) {
    openSearch_header__search(null, true);
    return;
  }


  var md = new Remarkable({
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

  var currentLook;
  var lastLookSearchInputKeypressTime;
  var lastKeypressTime;

  setInterval(function() {
    var now = new Date().getTime();
    if (lastKeypressTime && now - lastKeypressTime > 500) {
      lastKeypressTime = null;
      refreshLookTableColumns();
    }
    if (lastLookSearchInputKeypressTime && now - lastLookSearchInputKeypressTime > 500) {
      lastLookSearchInputKeypressTime = null;
      if (currentLook) {
        setLook(currentLook, true);
      }
    }
  }, 200);

  loadEntityData('get', MDSCommon.extend(DATA, { children: ['views','comments', 'likes'] }), function(result) {
    addJsonLD(result);
    setRootView(result);
  }, function() {});

  //
  // Save view button
  $('#look_modal__button').click(function() {
    if (!validateLookForm()) {
      return;
    }

    var lookPath = $('#look_modal__button').data('look-path');

    $('.modal-backdrop').css('opacity', 1);
    $('#look_modal__locker').removeClass('hidden');

    switch ($('#look_modal').data('look-type')) {
      case 'codepen':
        Mydataspace.request(lookPath ? 'entities.change' : 'entities.create', MDSCommon.extend(DATA, {
          path: lookPath || 'views/' + MDSCommon.guid(),
          fields: [
            { name: 'type', value: 'codepen', type: 's' },
            { name: 'title', value: $('#look_modal__title').val(), type: 's' },
            {
              name: 'id',
              value: getCodepenIDByURL($('#look_modal__codepen').val()),
              type: 's'
            },
            { name: 'description', value: $('#look_modal__description').val(), type: 's' }
          ]
        })).then(function(data) {
          $('#look_modal').modal('hide');
          $('.modal-backdrop').css('opacity', null);
          if (!lookPath) {
            setTimeout(function() { selectLook(data.path); }, 500);
          }
        }, function(err) {
          $('.modal-backdrop').css('opacity', null);
          UI.error(err);
        });
        break;
      case 'table':
        Mydataspace.request(lookPath ? 'entities.change' : 'entities.create', MDSCommon.extend(DATA, {
          path: lookPath || 'views/' + MDSCommon.guid(),
          fields: [
            { name: 'type', value: 'table', type: 's' },
            { name: 'title', value: $('#look_modal__title').val(), type: 's' },
            { name: 'description', value: $('#look_modal__description').val(), type: 's' },
            { name: 'path', value: $('#look_modal__table_path').val(), type: 's' }
          ]
        })).then(function(data) {
          return Promise.all([data, Mydataspace.request('entities.delete', MDSCommon.extend(DATA, {
            path: data.path + '/columns'
          })).catch(function() {})]);
        }).then(function(res) {
          var data = res[0];
          return Promise.all([data, Mydataspace.request('entities.create', MDSCommon.extend(DATA, {
            path: data.path + '/columns'
          }))]);
        }).then(function(res) {
          var data = res[0];
          var columns = [];
          var i = 0;
          $$('look_modal__table').data.each(function(obj) {
            columns.push(MDSCommon.extend(DATA, {
              path: data.path + '/columns/' + MDSCommon.guid(),
              fields: [
                { name: 'index', value: i, type: 'i' },
                { name: 'title', value: obj.title, type: 's' },
                { name: 'value', value: obj.value, type: 's' },
                { name: 'width', value: obj.width, type: 'i' }
              ]
            }));
            i++;
          });
          return Promise.all([data, Mydataspace.request('entities.create', columns)]);
        }).then(function(res) {
          var data = res[0];
          setTimeout(function() {
            $('.modal-backdrop').css('opacity', null);
            selectLook(data.path);
            $('#look_modal').modal('hide');
          }, 500);
        }, function(err) {
          $('.modal-backdrop').css('opacity', null);
          UI.error(err);
        });
        break;
      case 'list':
        // TODO: list view editor
        break;
    }
  });

  //
  // Delete view button
  document.getElementById('delete_look_modal_button').addEventListener('click', function() {
    var lookPath = $('#root__looks__content').data('look-path');
    Mydataspace.request('entities.delete', MDSCommon.extend(DATA, {
      path: lookPath
    })).then(function(data) { }, function(err) {});
  });

  Mydataspace.on('entities.change.res', function(data) {
    if (/^views\/[^\/]*$/.test(data.path)) {
      var preview = getLookPreviewNode(data.path);
      if (!preview) {
        throw new Error('Changed look is not exists');
      }

      $(preview).replaceWith(RootHTMLGen.getUnwrappedLookPreviewHTML(data, true));
      preview = getLookPreviewNode(data.path);
      $(preview).data('look-data', data);

      switch (MDSCommon.findValueByName(data.fields, 'type')) {
        case 'codepen':
          var codepenScript = document.createElement('script');
          codepenScript.setAttribute('src', 'https://assets.codepen.io/assets/embed/ei.js');
          preview.appendChild(codepenScript);
          break;
        case 'table':
          ;
          break;
        case 'list':
          ;
          break;
      }
      if (currentLook && currentLook.path === data.path) {
        setLook(data);
      }
    }
  });

  $('#look_modal__table_path').keydown(function() {
    lastKeypressTime = new Date().getTime();
  });

  function validateLookForm() {
    return RootHelper.validateLookForm();
  }

  function loadEntityData(method, requestData, success, fail) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
        if (xmlhttp.status === 200) {
          var data = JSON.parse(xmlhttp.responseText);
          success(data);
        } else {
          fail();
        }
      }
    };
    var query = '';
    for (var k in requestData) {
      if (query !== '') {
        query += '&';
      }
      if (requestData[k] != null) {
        var v = '';
        if (Array.isArray(requestData[k])) {
          for (var i = 0; i < requestData[k].length; i++) {
            if (v !== '') {
              v += '&';
            }
            v += k + '[' + i + ']=' + requestData[k][i];
          }
        } else {
          v = k + '=' + requestData[k];
        }
        query += v;
      }
    }
    xmlhttp.open('GET', API_URL + '/v1/entities/' + method + '?' + query, true);
    xmlhttp.send();
  }

  function getLookPreviewNode(path) {
    var ret;
    $('#root__looks__previews').find('.look_preview').each(function() {
      if ($(this).data('look-path') === path) {
        ret = this;
        return false;
      }
    });
    return ret;
  }

  function openLookEditModal(isEdit) {
    $('#look_modal').modal('show');
    if (isEdit) {
      document.getElementById('look_modal__header').innerText = tr$('edit_view');
      document.getElementById('look_modal__button').setAttribute('data-look-path', currentLook.path);
      document.getElementById('look_modal__button').innerText = tr$('save_view');
      document.getElementById('look_modal__title').value = MDSCommon.findValueByName(currentLook.fields, 'title');
      document.getElementById('look_modal__description').value = MDSCommon.findValueByName(currentLook.fields, 'description') || '';
      var type = MDSCommon.findValueByName(currentLook.fields, 'type');
      $('#look_modal__' + type + '_tab').addClass('active');
      $('#look_modal__' + type + '_wrap').removeClass('hidden');
      $('#look_modal').data('look-type', type);
      switch (type) {
        case 'codepen':
          document.getElementById('look_modal__codepen').value = getCodepenURL(MDSCommon.findValueByName(currentLook.fields, 'id'));
          break;
        case 'table':
          $('#look_modal__table_path').val(MDSCommon.findValueByName(currentLook.fields, 'path'));
          Mydataspace.request('entities.get', MDSCommon.extend(DATA, { path: currentLook.path + '/columns', children: true })).then(function(columnsData) {
            var formattedData = columnsData.children.map(function(column) {
              return {
                value: MDSCommon.findValueByName(column.fields, 'value'),
                title: MDSCommon.findValueByName(column.fields, 'title'),
                width: parseInt(MDSCommon.findValueByName(column.fields, 'width')) || 200
              }
            });
            $$('look_modal__table').parse(formattedData);
          });
          break;
        case 'list':
          // TODO: list presentation editor
          break;
      }
    } else {
      $('#look_modal').data('look-type', 'codepen');
      document.getElementById('look_modal__header').innerText = tr$('new_view');
      document.getElementById('look_modal__button').removeAttribute('data-look-path');
      document.getElementById('look_modal__button').innerText = tr$('create_view');
      $('#look_modal__codepen_tab').addClass('active');
      $('#look_modal__codepen_wrap').removeClass('hidden');
    }
  }

  function updateListLook(mode) {
    window.localStorage.setItem('listLookDisplayMode', mode);
    setLook(currentLook, true);
  }

  function showLookWaitingCloak() {
    var div = window.document.getElementById('search__results__waiting');
    if (div) {
      div.style.display = 'block';
    }
  }

  function hideLookWaitingCloak() {
    var div = window.document.getElementById('search__results__waiting');
    if (div) {
      div.style.display = 'none';
    }
  }

  function setLook(lookMetaData, preserveContent) {
    $('#root__looks__actions').find('.look__action--only-owner').css('display', lookMetaData.mine ? 'block' : 'none');
    var query = MDSCommon.parseQuery(window.location.search);

    if (window.parent !== window) { // in iframe hide close button
      $('#root__looks__actions').find('.look__action--non-embed').css('display', 'none');
    }

    var type = MDSCommon.findValueByName(lookMetaData.fields, 'type');
    $('#root__looks__title_icon').attr('class', 'fa fa-' + type);MDSCommon.findValueByName(lookMetaData.fields, 'type')
    $('#root__looks__title').text(MDSCommon.findValueByName(lookMetaData.fields, 'title'));
    $('#root__looks__content').data('look-path', lookMetaData.path);

    $('#root__looks__search').css('display', type === 'list' ? 'block' : 'none');

    if ($$('root__looks__content_wrap')) {
      $$('root__looks__content_wrap').destructor();
    }

    if (!preserveContent) {
      $('#root__looks__content').html('');
    }

    switch (type) {
      case 'codepen':
        setTimeout(function() {
          hideLookWaitingCloak();
          hideWaitingCloak();
        }, 1000);
        break;
      case 'table':
        Mydataspace.request('entities.get', MDSCommon.extend(DATA, { path: lookMetaData.path + '/columns', children: true })).then(function(columnsMetaData) {
          var columns = columnsMetaData.children.map(function(column) {
            return {
              id: MDSCommon.getPathName(column.path),
              header: [MDSCommon.findValueByName(column.fields, 'title'), {
                content: 'serverFilter',
                css: 'root__looks__table_header'
              }],
              width: parseInt(MDSCommon.findValueByName(column.fields, 'width')) || 200,
              sort: 'server'
            };
          });
          columns.push({
            header: '',
            fillspace: true
          });
          webix.ui({
            container: 'root__looks__content',
            id: 'root__looks__content_wrap',
            rows: [
              { padding: 3,
                css: 'root__about__look_search',
                cols: [
                  { view: 'search',
                    icon: 'search',
                    id: 'root__looks__content_search',
                    placeholder: 'Search...',
                    on: {
                      onTimedKeyPress: function(code, e) {
                        $$('root__looks__content').define('search', this.getValue());
                        $$('root__looks__content').load('look->');
                      }
                    }
                  }
                ]
              },
              { view: 'datatable',
                id: 'root__looks__content',
                css: 'root__about__look_webix',
                columns: columns,
                select: 'row',
                resizeColumn: true,
                headerRowHeight: 40,
                navigation: true,
                datafetch: 40,
                loadahead: 20,
                height: $(window).innerHeight() - 133,
                clipboard: 'selection',
                lookMetaData: lookMetaData,
                columnsMetaData: columnsMetaData,
                DATA: DATA,
                url: 'look->',
                pager: 'root__looks__content_pager',
                on: {
                  onColumnResize: function (id, newWidth, oldWidth, user_action) {
                    if (!user_action) {
                      return;
                    }
                    Mydataspace.request('entities.change', MDSCommon.extend(DATA, {
                      path: lookMetaData.path + '/columns/' + id,
                      fields: [
                        {name: 'width', value: newWidth, type: 'i'}
                      ]
                    })).catch(function () {
                    });
                  }
                }
              },
              { css: 'root__about__look_pager_wrap',
                cols: [
                  { view: 'pager',
                    id: 'root__looks__content_pager',
                    size: 40,
                    group: 5,
                    height: 40,
                    css: 'root__about__look_pager',
                    template: '<span class="root__about__look_pager_counter">#count# records</span>  {common.pages()}'
                  }
                ]
              }
            ]
          });

          hideWaitingCloak();
        });
        break;
      case 'list':
        showLookWaitingCloak();

        var req = JSON.parse(MDSCommon.findValueByName(lookMetaData.fields, 'request'));

        req.offset = MDSCommon.isInt(query.offset) ? parseInt(query.offset) : 0;

        if (MDSCommon.isPresent(query.search)) {
          $('#root__looks__search_input').val(query.search);
          $('#root__looks__header').addClass('look__header--search');
        }

        req = MDSCommon.extend(MDSCommon.extend(DATA, req), {
          children: true,
          search: $('#root__looks__search_input').val(),
          filter: MDSCommon.convertNameValueArrayToMap($('#root__looks__content').data('list-look-filters') || [])
        });

        Mydataspace.request('entities.get', req).then(function(data) {
          return Promise.all([data, Mydataspace.request('entities.get', MDSCommon.extend(DATA, {
            path: lookMetaData.path + '/filters',
            children: true
          }))]);
        }).then(function(res) {
          var filtersReq = res[1].children.filter(function(filter) {
            var name = MDSCommon.getPathName(filter.path);
            return MDSCommon.isPresent(res[0].facets[name]);
          }).map(function(filter) {
            return MDSCommon.extend(DATA, { path: filter.path, children: true });
          });
          return Promise.all([res[0], Mydataspace.request('entities.get', filtersReq)]);
        }).then(function(res) {
          var data = res[0];
          var filtersMetaData;
          if (Array.isArray(res[1])) {
            filtersMetaData = res[1];
          } else if (res[1]) {
            filtersMetaData = [res[1]];
          } else {
            filtersMetaData = [];
          }

          var colWidth;
          var snippetHTMLFieldName;
          var snippetClass;
          var displaySnippetButtonClass;
          var displayLineButtonClass;
          var searchResultNoFiltersClass = data.facets == null ? 'search__results--no-filter-panel' : '';

          var listTemplate = MDSCommon.findValueByName(lookMetaData.fields, 'listTemplate');
          var sn;
          var snippetTemplate = MDSCommon.findValueByName(lookMetaData.fields, 'snippetTemplate');
          var lineTemplate = MDSCommon.findValueByName(lookMetaData.fields, 'lineTemplate');
          var pageTemplate = MDSCommon.findValueByName(lookMetaData.fields, 'pageTemplate');

          var ls = parseSnippetTemplate(listTemplate || '---\n---\n');

          var listLookDisplayMode;
          if (snippetTemplate && lineTemplate) {
            listLookDisplayMode = window.localStorage.getItem('listLookDisplayMode') || 'line';
          } else if (snippetTemplate) {
            listLookDisplayMode = 'snippet';
          } else if (lineTemplate) {
            listLookDisplayMode = 'line';
          }

          switch (listLookDisplayMode) {
            case 'snippet':
              colWidth = 6;
              snippetClass = '';
              snippetHTMLFieldName = 'snippetHTML';
              displaySnippetButtonClass = 'active';
              displayLineButtonClass = '';
              sn = parseSnippetTemplate(snippetTemplate);
              break;
            case 'line':
              colWidth = 12;
              snippetClass = 'snippet--line snippet--line--no-padding-bottom';
              snippetHTMLFieldName = 'lineHTML';
              displaySnippetButtonClass = '';
              displayLineButtonClass = 'active';
              sn = parseSnippetTemplate(lineTemplate);
              break;
          }

          var pg;
          if (pageTemplate) {
            pg = parseSnippetTemplate(pageTemplate);
          } else {
            snippetClass += ' snippet--no-pointer';
          }

          var itemsHTML = data.children.map(function(item) {
            return '<div class="col-md-' + colWidth + '">' +
              '<div class="block snippet ' + snippetClass + ' clearfix" data-item-path="' + item.path + '">\n' +
              (MDSCommon.isPresent(sn.css) ? '<style>' + sn.css + '</style>\n' : '') +
              sn.template(MDSCommon.convertNameValueArrayToMap(item.fields || [])) +
              '</div>' +
              '</div>';
          });

          var pageIndex = Math.floor(req.offset / req.limit);
          var lastPageIndex = Math.floor(data.total / req.limit);

          var pagesHTML = '<span class="search__results__page search__results__page--active" id="search__results__page_' + (pageIndex + 1) + '">' + (pageIndex + 1) + '</span>';

          var offset;
          for (var i = pageIndex - 1; i >= Math.max(0, pageIndex - 4); i--) {
            offset = i * req.limit;
            pagesHTML = '<a href="?offset=' + offset + '&search=' + encodeURIComponent(req.search || '') + '" data-offset="' + offset + '" class="search__results__page" id="search__results__page_' + (i + 1) + '">' + (i + 1) + '</a>' + pagesHTML;
          }

          for (i = pageIndex + 1; i <= Math.min(lastPageIndex, pageIndex + 4); i++) {
            offset = i * req.limit;
            pagesHTML += '<a href="?offset=' + offset + '&search=' + encodeURIComponent(req.search || '') + '" data-offset="' + offset + '" class="search__results__page" id="search__results__page_' + (i + 1) + '">' + (i + 1) + '</a>';
          }

          $('#root__looks__content').html('<div class="smoke smoke--fullscreen--opaque smoke--fullscreen smoke--fullscreen--fixed">' +
            '<div class="container search__content search__content--fixed">' +
            (data.children.length > 0 ?
              '<div class="search__results ' + searchResultNoFiltersClass + '">' +
              '<div class="search__header clearfix">' +
              '<div class="search__found_count">' + SEARCH_FOUND_PREFIX + ' ' + data.children.length + ' ' + SEARCH_FOUND_ITEMS_SUFFIX + '</div>' +
              '<div class="btn-group search__display_modes ' + (!lineTemplate || !snippetTemplate ? 'hidden' : '') + ' " role="group">' +
              (lineTemplate ? '<button type="button" class="btn btn-default ' + displayLineButtonClass + '" id="root__look__content__list_look_display_line"><i class="fa fa-list"></i></button>' : '') +
              (snippetTemplate ? '<button type="button" class="btn btn-default ' + displaySnippetButtonClass + ' " id="root__look__content__list_look_display_snippet"><i class="fa fa-th-large"></i></button>' : '') +
              '</div>' +
              '</div>' +
              '<div>' +
              '<style>' + ls.css + '</style>' +
              '<div class="row">' + itemsHTML.join('\n') + '</div>' +
              '</div>' +
              '<div class="search__results__pages">' + pagesHTML + '</div>' +
              '</div>' +
              '<div class="search__filter_panel_wrap">' +
              '<div class="search__filter_panel">' +
              RootHTMLGen.getListLookFilters(data.facets || {}, filtersMetaData) +
              '</div>' +
              '</div>' : '<div class="search__no_results">' + SEARCH_NO_RESULTS + '</div>') +
            '<div class="search__results__waiting ' + (data.facets == null ? 'search__results__waiting--no-side-menu' : '') + '" id="search__results__waiting"></div>' +
            '</div>' +
            '</div>');

          var scriptsHTML =  ls.scripts({}) + '\n' + data.children.map(function(item) {
            return sn.scripts(MDSCommon.convertNameValueArrayToMap(item.fields || []));
          }).filter(function(s) { return s !== ''; }).join('\n');

          $(scriptsHTML).appendTo('#root__looks__content');

          $('#root__look__content__list_look_display_snippet').on('click', function() { updateListLook('snippet'); });
          $('#root__look__content__list_look_display_line').on('click', function() { updateListLook('line'); });
          $('#root__looks__content').find('.search_filter__items').on('click', '.search_filter__item', function() {
            var currentFilters = $('#root__looks__content').data('list-look-filters') || [];
            var filter = MDSCommon.findByName(currentFilters, $(this).data('filter-name'));
            var newFilter = { name: $(this).data('filter-name'), value: $(this).data('filter-value') };
            if (filter) {
              if (filter.value === newFilter.value) {
                filter.value = null;
              } else {
                filter.value = newFilter.value;
              }
            } else {
              currentFilters.push(newFilter);
            }
            $('#root__looks__content').data('list-look-filters', currentFilters);
            updateListLook('line');
          });

          $('#root__looks__content').find('.search__results').on('click', '.snippet', function() {
            if (!pageTemplate) {
              return;
            }

            var $this = $(this);
            var path = $this.data('item-path');
            Mydataspace.request('entities.get', MDSCommon.extend(DATA, { path: path, children: true })).then(function(data) {
              var itemFields = MDSCommon.convertNameValueArrayToMap(data.fields || []);
              var $pageContent = $('#list_look_page_modal__content');
              $pageContent.html(pg.template(itemFields));
              $(pg.scripts(itemFields).join('\n')).appendTo($pageContent);
              $('#list_look_page_modal').modal('show');
            });
          });
          hideLookWaitingCloak();
          hideWaitingCloak();
        });
        break;
    }
    currentLook = lookMetaData;
  }

  function unselectLook() {
    var previews = document.getElementById('root__looks__previews');
    $(previews).find('.look_preview--active').removeClass('look_preview--active');
    $('#root__looks__content_wrap').css('display', 'none');
    $('body').css('overflow', '');
    currentLook = null;
//      $('#root__looks__content').data('look-path', null);
    $('#root__looks__content').removeData();

    var q = MDSCommon.parseQuery(window.location.search);
    delete q.offset;
    delete q.search;
    history.pushState({}, null, lang + '/' + DATA.root + '/views' + MDSCommon.toQuery(q));
  }

  function selectLook(path) {
    if (path == null) {
      return;
    }

    var preview = getLookPreviewNode(path);

    if (!preview) {
      return;
    }

    $('#root__looks__previews').find('.look_preview--active').removeClass('look_preview--active');

    $('#root__looks__content_wrap').css('display', 'block');

    $('body').css('overflow', 'hidden');

    $(preview).addClass('look_preview--active');

    setLook($(preview).data('look-data'));

    history.pushState({}, '', lang + '/' + DATA.root + '/' + path + window.location.search);
  }

  function postComment() {
    if (!Mydataspace.isLoggedIn()) {
      $('#signin_modal').modal('show');
      return;
    }

    var $newComment = $('#root__new_comment');
    var $textarea = $newComment.find('.new_comment__textarea');
    var $button = $newComment.find('.new_comment__button');

    if ($textarea.val().trim() === '') {
      $textarea.addClass('new_comment__textarea--error');
      $textarea.focus();
      return;
    }

    $button.prop('disabled', true);
    $textarea.prop('disabled', true);

    Mydataspace.request('entities.create', {
      root: DATA.root,
      path: 'comments/' + MDSCommon.guid(),
      fields: [
        {
          name: 'text',
          value: $textarea.val().trim(),
          type: 's'
        }
      ]
    }, function() {
      $textarea.val('');
      $button.prop('disabled', false);
      $textarea.prop('disabled', false);
      $textarea.focus();
      updateCommentFormTextareaHeight();
    }, function(err) {
      $button.prop('disabled', false);
      $textarea.prop('disabled', false);
      console.log(err);
    });
  }

  function updateCommentFormTextareaHeight() {
    var textarea = document.getElementById('root__comments__new_comment_textarea');
    setTimeout(function(){
      textarea.style.cssText = 'height: auto; padding: 0';
      textarea.style.cssText = 'height: ' + textarea.scrollHeight + 'px';
    }, 0);
  }

  function initNewCommentForm() {
    var $newComment = $('#root__new_comment');
    var $textarea = $newComment.find('.new_comment__textarea');
    $textarea.on('focus', function() {
      $(this).parent().parent().find('.new_comment__button').show();
      $(this).addClass('new_comment__textarea--extended');
      if ($textarea.hasClass('new_comment__textarea--error')) {
        setTimeout(function() {
          $textarea.removeClass('new_comment__textarea--error')
        }, 200);
      }
    });
    $textarea.on('keydown', function(event) {
      if (event.ctrlKey && event.keyCode === 13) {
        postComment();
      }
      updateCommentFormTextareaHeight();
    });
    $newComment.find('.new_comment__button').on('click', function() {
      postComment();
    });
  }

  function initCounters() {
    $('#root__counters_comments').click(function() {
      selectTab('VIEW_TAB_COMMENTS_LABEL');
    });

    var likesElem = document.getElementById('root__counters_likes');
    likesElem.addEventListener('click', function() {
      if (!Mydataspace.isLoggedIn()) {
        $('#signin_modal').modal('show');
        return;
      }

      if (document.getElementById('root__counters_likes_icon').className === 'fa like_icon_animation fa-heart') {
        return;
      }

      document.getElementById('root__counters_likes_icon').className = 'fa like_icon_animation fa-heart';

      if (MDSCommon.isPresent(likesElem.getAttribute('data-like-path'))) {
        Mydataspace.entities.request('entities.delete', MDSCommon.extend(DATA, {
          path: likesElem.getAttribute('data-like-path')
        })).then(function() {
          document.getElementById('root__counters_likes_icon').className = 'fa fa-heart';
        }, function(err) {
          document.getElementById('root__counters_likes_icon').className = 'fa fa-heart';
          console.log(err);
        });
      } else {
        Mydataspace.entities.request('entities.create', MDSCommon.extend(DATA, {
          path: 'likes/' + MDSCommon.guid()
        })).then(function() {
          document.getElementById('root__counters_likes_icon').className = 'fa fa-heart';
        }, function(err) {
          document.getElementById('root__counters_likes_icon').className = 'fa fa-heart';
          console.log(err);
        });
      }
    });
  }

  function updateLooks(looksData) {
    if (looksData.length === 0) {
      $('#root__looks__empty').css('display', 'block');
      return;
    }

    $('#root__looks__empty').css('display', 'none');

    var previewsHTML = '';
    $.each(looksData, function(i, val) {
      previewsHTML += RootHTMLGen.getLookPreviewHTML(val);
    });

    $('#root__looks__previews').html(previewsHTML).find('.look_preview').each(function(i) {
      $(this).data('look-data', looksData[i]);
    });

    var codepenScript = document.createElement('script');
    codepenScript.setAttribute('src', 'https://assets.codepen.io/assets/embed/ei.js');
    document.getElementById('root__looks').appendChild(codepenScript);
  }

  function selectTab(tabID, itemID) {
    if (itemID) {
      showWaitingCloak();
    }
    var tab = document.getElementById(tabID);
    var el;
    for (var tid in TABS) {
      document.getElementById(tid).classList.remove('view__tab--active');
      el = document.getElementById(TABS[tid]);
      if (el) {
        el.style.display = 'none';
      }
    }
    tab.classList.add('view__tab--active');

    el = document.getElementById(TABS[tabID]);
    if (el) {
      el.style.display = 'block';
    }

    document.getElementById('webix').style.display = 'none';
    switch (tabID) {
      case 'VIEW_TAB_VIEW_LABEL':

        document.getElementById('root__new_look').classList.remove('hidden');

        if (document.getElementById('root__tabs_views_count').innerText === '0') {
          document.getElementById('root__looks__empty').style.display = 'block';
        } else {
          document.getElementById('root__looks__empty').style.display = 'none';
        }
        Mydataspace.entities.request('entities.get', MDSCommon.extend(DATA, { children: true, path: 'views' })).then(function(data) {
          updateLooks(data.children);
          if (itemID) {
            selectLook('views/' + itemID);
          }
        });
        break;
      case 'VIEW_TAB_COMMENTS_LABEL':
        document.getElementById('root__new_look').classList.add('hidden');
        Mydataspace.entities.request('entities.get', MDSCommon.extend(DATA, { children: true, path: 'comments', limit: 7, orderChildrenBy: '$createdAt DESC' })).then(function(data) {
          var comments = document.getElementById('root__comments__list');
          comments.innerHTML = '';
          var html = '';
          for (var i in data.children) {
            html = RootHTMLGen.getCommentHTML(data.children[i]) + html;
          }
          comments.innerHTML = html;
          if(html === '') {
            document.getElementById('root__comments__empty').style.display = 'block';
          }
        });
        break;
      case 'VIEW_TAB_README_LABEL':
        //document.getElementById('root__data_link').classList.remove('hidden');
        document.getElementById('root__new_look').classList.add('hidden');
        break;
      case 'VIEW_TAB_EXPLORE_LABEL':
        document.getElementById('bootstrap').style.display = 'block';
        document.getElementById('webix').style.display = 'block';
        if (!UI.entityTree.getCurrentId()) {
          UI.entityTree.refresh();
        }
        break;
    }

    if (!itemID) {
      for (var u in URL_TABS) {
        if (URL_TABS[u] === tabID) {
          var url = lang + '/' + DATA.root + '/' + u + window.location.search;
          history.pushState({}, '', url);
          break;
        }
      }
    }
  }

  function initTabs() {
    for (var tabID in TABS) {
      (function(tabID) {
        var tab = document.getElementById(tabID);
        tab.addEventListener('click', function(event) {
          event.preventDefault();
          selectTab(tabID);
        });
      })(tabID);
    }
  }


  /**
   * Render root page for received data.
   * @param data root's data.
   */
  function setRootView(data) {
    var view = document.getElementById('root');
    if (view.innerHTML === '%%root-page.html%%') {
      view.innerHTML = '';
    }
    (view.innerHTML === '' ? $.ajax({ url: '/fragments/root-page.html', method: 'get' }) : Promise.resolve(view.innerHTML)).then(function(html) {
      var websiteURL = MDSCommon.findValueByName(data.fields, 'websiteURL');
      var description = MDSCommon.findValueByName(data.fields, 'description');
      var readme = MDSCommon.findValueByName(data.fields, 'readme');
      var ava = MDSCommon.findValueByName(data.fields, 'avatar');

      if (view.innerHTML === '') {
        view.innerHTML = html;
      }

      if (MDSCommon.isPresent(ava)) {
        ava = Mydataspace.options.cdnURL + '/avatars/sm/' + ava + '.png';
      }
      document.getElementById('root__overview_image').src = ava || '/images/icons/root.svg';
      var title = MDSCommon.findValueByName(data.fields, 'name') || MDSCommon.getPathName(data.root);
      document.getElementById('root__title').innerText = title;
      document.title = title;

      document.getElementById('root__version').innerText = '#' +
        (MDSCommon.findValueByName(data.fields, '$version') || 0);

      $('#root__version').tooltip({ placement: 'bottom', container: 'body' });


      var tags = (MDSCommon.findValueByName(data.fields, 'tags') || '').split(' ').filter(function(tag) {
        return tag != null && tag !== '';
      }).map(function(tag) {
        return '<a class="view__tag" href="/search?q=%23' + tag + '" onclick="openSearch_header__search(\'' + tag + '\'); return false;">' + tag + '</a>';
      }).join(' ');


      var languageAbbr = MDSCommon.findValueByName(data.fields, 'language');
      var countryAbbr = MDSCommon.findValueByName(data.fields, 'country');
      var category = MDSCommon.findValueByName(data.fields, 'category');
      var country = COUNTRIES[countryAbbr];
      var language = COUNTRIES[languageAbbr];

      if (category) {
        tags = '<span class="view__tag" onclick="openSearch_header__search(\'#cat:' + category + '\'); return false;"><i class="view__tag_icon fa fa-' + CATEGORY_ICONS[category] + '"></i><span>' + tr$('categories.' + category) + '</span></span> ' + tags;
      }

      if (country && (languageAbbr === countryAbbr || (language.same || []).indexOf(countryAbbr) != -1)) {
        tags = '<span class="view__tag view__tag--flag view__tag--multi_link">' +
          '<img class="view__tag_icon view__tag_icon--flag view__tag_icon--flag--lg" src="/images/square_flags/' + country.name + '.svg" />' +
          '<span class="view__tag_link" onclick="openSearch_header__search(\'#lang:' + languageAbbr + '\'); return false;">' +
          tr$('languagesShort.' + languageAbbr) + '</span> / ' +
          '<span class="view__tag_link" onclick="openSearch_header__search(\'#ctry:' + countryAbbr + '\'); return false;">' +
          tr$('countries.' + countryAbbr) + '</span></span> ' + tags;
      } else {
        if (country) {
          tags = '<span class="view__tag view__tag--flag" onclick="openSearch_header__search(\'#ctry:' + countryAbbr + '\'); return false;">' +
            '<img class="view__tag_icon view__tag_icon--flag view__tag_icon--flag--lg" src="/images/square_flags/' + country.name + '.svg" />' +
            tr$('countries.' + countryAbbr) + '</span> ' + tags;
        }

        if (language) {
          tags = '<span class="view__tag view__tag--flag" onclick="openSearch_header__search(\'#lang:' + languageAbbr + '\'); return false;">' +
            '<img class="view__tag_icon view__tag_icon--flag view__tag_icon--flag--lg" src="/images/square_flags/' + language.name + '.svg" />' +
            tr$('languagesShort.' + languageAbbr) + '</span> ' + tags;
        }
      }

      if (MDSCommon.findValueByName(data.fields, '$type') === 't') {
        tags = '<span class="view__tag" onclick="openSearch_header__search(\'#type:template\'); return false;"><i class="view__tag_icon fa fa-copy"></i><span>' + tr$('types.template') + '</span></span> ' + tags;
      }

      var license = MDSCommon.findValueByName(data.fields, 'license');
      if (MDSCommon.isPresent(license)) {
        var licenseOrig = license;
        license = getLicenseWithoutVersion(license);
        if (license === 'none') {
          tags = '<a href="/search?q=%23license:' + license + '" class="view__tag view__tag--license-none" onclick="openSearch_header__search(\'#license:' + license + '\'); return false;">' + tr$('licenses.none') + '</a> ' + tags;
        } else {
          tags = '<a href="/search?q=%23license:' + license + '" class="view__tag view__tag--license' +
            ' view__tag--license--' + license +
            ' view__tag--license--' + license + '--' + (getCurrentLanguage() || 'en').toLowerCase() +
            '" onclick="openSearch_header__search(\'#license:' + license + '\'); return false;"' +
            ' data-license="' + licenseOrig + '"' +
            ' data-root="' + data.root + '"' +
            '>&nbsp;</a> ' + tags;
        }
      }

      if (MDSCommon.isPresent(tags)) {
        document.getElementById('root__tags').innerHTML = tags;
        createLicenseDrop({
          selector: '#root__tags .view__tag--license'
        });
      } else {
        document.getElementById('root__tags').style.display = 'none';
      }


      if (tags && websiteURL) {
        document.getElementsByClassName('view__overview_image_wrap')[0].classList.add('view__overview_image_wrap--large');
        document.getElementById('root__overview_image').classList.add('view__overview_image--large');
      } else if (tags || websiteURL) {
        document.getElementsByClassName('view__overview_image_wrap')[0].classList.add('view__overview_image_wrap--medium');
        document.getElementById('root__overview_image').classList.add('view__overview_image--medium');
      }

      if (MDSCommon.isBlank(websiteURL)) {
        document.getElementById('root__websiteURL').style.display = 'none';
      } else {
        document.getElementById('root__websiteURL').style.display = 'inline';
        document.getElementById('root__websiteURL').innerText = websiteURL;
        document.getElementById('root__websiteURL').href = websiteURL;
      }

      if (MDSCommon.isBlank(description)) {
        if (MDSCommon.isBlank(websiteURL)) {
          document.getElementById('root__description').innerHTML = '<i>' +
            STRINGS.no_description_provided +
            '</i>';
        }
      } else {
        document.getElementById('root__description').innerText = description;
      }

      if (MDSCommon.isBlank(readme)) {
        document.getElementById('root__readme').style.display = 'none';
      } else {
        document.getElementById('root__readme').style.display = 'block';
      }
      document.getElementById('root__readme').innerHTML = md.render(readme);

      //document.getElementById('root__tabs').classList.remove('hidden');


      for (var i in data.children) {
        var child = data.children[i];
        switch (child.path) {
          case 'views':
            document.getElementById('root__tabs_views_count').innerText = child.numberOfChildren;
            break;
        }
      }

      document.getElementById('root__counters_likes_count').innerText = MDSCommon.findValueByName(data.fields, '$likes');
      document.getElementById('root__counters_comments_count').innerText = MDSCommon.findValueByName(data.fields, '$comments');
      document.getElementById('root__tabs_comments_count').innerText = MDSCommon.findValueByName(data.fields, '$comments');

      //data.profile = {
      //  name: 'Denis',
      //  username: 'denis',
      //  about: 'Hello, World!',
      //};

      if (MDSCommon.isBlank(data.profile)) {
        document.getElementById('root__side_panel').style.display = 'none';
        document.getElementById('root__about_content').style.width = '100%';
      } else if (document.getElementById('root__user')) {
        document.getElementById('root__user_name').innerText = data.profile.name;
        if (data.profile.verified) {
          document.getElementById('root__user_verified').style.display = 'block';
          document.getElementById('root__user_name').classList.add('view__user_name--verified');
        }
        document.getElementById('root__user_username').innerText = '@' + data.profile.username;
        if (data.profile.about) {
          document.getElementById('root__user_about').innerText = data.profile.about;
        } else {
          document.getElementById('root__user_about').style.display = 'none';
        }
        var userAvatar = MDSCommon.isPresent(data.profile.avatar) ? 'https://cdn.mydataspace.net/avatars/lg/' + data.profile.avatar + '.png' : 'https://myda.space/images/no_avatar.png';
        var userCover = MDSCommon.isPresent(data.profile.cover) ? 'https://cdn.mydataspace.net/images/md/' + data.profile.avatar + '.png' : 'https://myda.space/images/default_cover_sm.jpg';
        document.getElementById('root__user_avatar').src = userAvatar;
        document.getElementById('root__user_cover').style.backgroundImage = 'url("' + userCover + '")';
      }

//        document.getElementById('root__date').innerText = MDSCommon.humanizeDate(data.createdAt);

      initCounters();

      initTabs();

      initNewCommentForm();

      if (Mydataspace.isLoggedIn()) {
        requestMyLike();
      }

      Mydataspace.on('login', function() {
        requestMyLike();
        if (currentLook) {
          selectLook(currentLook.path);
        }
      });

      $('#root__comments__list').on('click', '.view__comment__delete', function() {
        var commentPath = this.parentNode.getAttribute('data-comment-path');
        $(this).find('i').addClass('fa-spin');

        Mydataspace.request('entities.delete', MDSCommon.extend(DATA, {
          path: commentPath
        }, function() {
          $(this).find('i').removeClass('fa-spin');
        }, function(err) {
          $(this).find('i').removeClass('fa-spin');
          console.log(err);
        }));
      });

      $('#root__looks__previews').on('click', '.look_preview', function() {
        showWaitingCloak();
        selectLook($(this).data('look-path'));
      });

      document.getElementById('root__looks__close').addEventListener('click', function() {
        unselectLook();
      });

      document.getElementById('root__looks__edit').addEventListener('click', function() {
        openLookEditModal(true);
      });

      document.getElementById('root__looks__search').addEventListener('click', function() {
        document.getElementById('root__looks__header').classList.add('look__header--search');
        document.getElementById('root__looks__search_input').focus();
        this.style.display = 'none';
      });

      document.getElementById('root__looks__search_input').addEventListener('blur', function() {
        if (this.value === '') {
          document.getElementById('root__looks__header').classList.remove('look__header--search');
          document.getElementById('root__looks__search').style.display = 'block';
        }
      });

      document.getElementById('root__looks__search_input').addEventListener('keydown', function() {
        lastLookSearchInputKeypressTime = new Date().getTime();
      });

      document.getElementById('root__new_look').addEventListener('click', function() {
        if (!Mydataspace.isLoggedIn()) {
          $('#signin_modal').modal('show');
          return;
        }
        openLookEditModal(false);
      });

      document.getElementById('root__version').addEventListener('click', function() {
        loadEntityData('getRootVersions', DATA, function(result) {
          var table = document.getElementById('change_root_version_modal__table').tBodies[0];

          for (var i = table.rows.length - 1; i >= 0; i--) {
            table.deleteRow(i);
          }

          for (var i = 0; i < result.versions.length; i++) {
            var row = table.insertRow();
            var version = result.versions[i];
            var number = row.insertCell(0);
            var createdAt = row.insertCell(1);
            var description = row.insertCell(2);
            var numberLink = document.createElement('a');
            var createdAtLink = document.createElement('a');
            var descriptionLink = document.createElement('a');

            numberLink.href = 'https://myda.space/' + DATA.root + '?v=' + version.version;
            createdAtLink.href = 'https://myda.space/' + DATA.root + '?v=' + version.version;
            descriptionLink.href = 'https://myda.space/' + DATA.root + '?v=' + version.version;

            numberLink.appendChild(document.createTextNode(version.version));
            createdAtLink.appendChild(document.createTextNode(version.createdAt));
            descriptionLink.appendChild(document.createTextNode(version.versionDescription || ''));

            number.appendChild(numberLink);
            createdAt.appendChild(createdAtLink);
            description.appendChild(descriptionLink);
          }
        }, function(err) { });
      });

      // Load data for root and render it on the page
      Mydataspace.request('entities.get', MDSCommon.extend(DATA, {
        path: 'views',
        children: true,
        limit: 1,
        orderChildrenBy: '$createdAt DESC'
      })).then(function(result) {
        var $lookWrap = $('#root__about__look_wrap');
        var $look = $('#root__about__look');

        if (result.children.length > 0) {
          $lookWrap.css('display', 'block');
          var lookMetaData = result.children[0];
          var type = MDSCommon.findValueByName(lookMetaData.fields, 'type');
          $('#root__about__look_title').text(MDSCommon.findValueByName(lookMetaData.fields, 'title'));
          $('#root__about__look_icon').attr('class', 'fa fa-' + type);
          $look.attr('class', 'root__about__look root__about__look--' + type);

          switch (type) {
            case 'codepen':
              var codepenParts = MDSCommon.findValueByName(lookMetaData.fields, 'id').split('/');
              $look.html('<p data-height="402" data-theme-id="0" data-slug-hash="' + codepenParts[1] +
                '" data-default-tab="result" data-user="'+ codepenParts[0] +
                '" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/' +  codepenParts[0] +
                '/pen/' + codepenParts[1] + '/">' + codepenParts[1] +
                '</a> by MyDataSpace (<a href="http://codepen.io/mydataspace">@mydataspace</a>) on <a href="http://codepen.io">CodePen</a>.</p>');

              var codepenScript = document.createElement('script');
              codepenScript.setAttribute('src', 'https://assets.codepen.io/assets/embed/ei.js');
              $lookWrap.append(codepenScript);
              break;
            case 'table':
              $look.html('');
              Mydataspace.request('entities.get', MDSCommon.extend(DATA, { path: lookMetaData.path + '/columns', children: true })).then(function(columnsMetaData) {
                var columns = columnsMetaData.children.map(function(column) {
                  return {
                    id: MDSCommon.getPathName(column.path),
                    header: [MDSCommon.findValueByName(column.fields, 'title'), {
                      content: 'serverFilter',
                      css: 'root__looks__table_header'
                    }],
                    width: parseInt(MDSCommon.findValueByName(column.fields, 'width')) || 200,
                    sort: 'server'
                  };
                });
                columns.push({
                  header: '',
                  fillspace: true
                });
                webix.ui({
                  container: 'root__about__look',
                  rows: [
                    { padding: 3,
                      css: 'root__about__look_search',
                      cols: [
                        { view: 'search',
                          icon: 'search',
                          placeholder: 'Search...',
                          id: 'root__about__look_search',
                          on: {
                            onTimedKeyPress: function(code, e) {
                              $$('root__about__look').define('search', this.getValue());
                              $$('root__about__look').load('look->');
                            }
                          }
                        }
                      ]
                    },
                    { view: 'datatable',
                      borderless: true,
                      id: 'root__about__look',
                      css: 'root__about__look_webix',
                      columns: columns,
                      select: 'row',
                      resizeColumn: true,
                      headerRowHeight: 40,
                      navigation: true,
                      datafetch: 40,
                      loadahead: 20,
                      autoheight: true,
                      minHeight: 430,
                      clipboard: 'selection',
                      lookMetaData: lookMetaData,
                      columnsMetaData: columnsMetaData,
                      DATA: DATA,
                      url: 'look->',
                      pager: 'root__about__look_pager',
                      on: {
                        onColumnResize: function(id, newWidth, oldWidth, user_action) {
                          if (!user_action) {
                            return;
                          }
                          Mydataspace.request('entities.change', MDSCommon.extend(DATA, {
                            path: lookMetaData.path + '/columns/' + id,
                            fields: [
                              { name: 'width', value: newWidth, type: 'i' }
                            ]
                          })).catch(function() {});
                        }
                      }
                    },
                    { css: 'root__about__look_pager_wrap',
                      cols: [
                        { view: 'pager',
                          id: 'root__about__look_pager',
                          size: 12,
                          group: 5,
                          height: 40,
                          css: 'root__about__look_pager',
                          animate: {
                            direction: 'top'
                          },
                          template: '<span class="root__about__look_pager_counter">#count# records</span> {common.pages()}'
                        }
                      ]
                    }
                  ]
                });
              });
              break;
            case 'list':
              $('#root__about_look_content').find('.view__about__look_title').hide();
              $look.html('<iframe class="root__about__look_iframe" src="/' + DATA.root + '/' + lookMetaData.path + '"></iframe>');
              break;
          }
        }
      });

      var pathnameParts = getPathnameParts(location.pathname);
      if (pathnameParts[1]) {
        selectTab(URL_TABS[pathnameParts[1]], pathnameParts[2]);
      }
    });

    var datasource = MDSCommon.findValueByName(data.fields, 'datasource');
    if (datasource) {
      Mydataspace.request('entities.get', { root: 'datasources', path: 'data/' + datasource }).then(function(datasourceData) {
        $('#root__datasource')
          .removeClass('hidden')
          .attr('onclick', 'openSearch_header__search(\'#src:' + datasource + ' \');');
//            .click(function() { openSearch_header__search('#src:' + datasource) });

        $('#root__datasource_icon').attr('src', CDN_URL + '/avatars/md/' + MDSCommon.findValueByName(datasourceData.fields, 'avatar') + '.png');
        $('#root__datasource_title').text(MDSCommon.findValueByName(datasourceData.fields, 'name'));
        $('#root__datasource_name')
          .attr('href', 'http://' + MDSCommon.getPathName(datasourceData.path))
          .text(MDSCommon.getPathName(datasourceData.path))
      });
    }

  }

  //
  // Likes & comments
  //

  Mydataspace.emit('entities.subscribe', MDSCommon.extend(DATA, {
    path: 'comments/*'
  }));

  Mydataspace.emit('entities.subscribe', MDSCommon.extend(DATA, {
    path: 'likes/*'
  }));

  Mydataspace.emit('entities.subscribe', MDSCommon.extend(DATA, {
    path: 'views/*'
  }));

  Mydataspace.on('entities.create.res', function(data) {
    if (/^likes\//.test(data.path)) {
      document.getElementById('root__counters_likes_count').innerText =
        parseInt(document.getElementById('root__counters_likes_count').innerText) + 1;
      if (data.mine) {
        setMyLike(data);
      }
    } else if (/^comments\//.test(data.path)) {
      document.getElementById('root__tabs_comments_count').innerText =
        parseInt(document.getElementById('root__tabs_comments_count').innerText) + 1;
      document.getElementById('root__counters_comments_count').innerText =
        parseInt(document.getElementById('root__counters_comments_count').innerText) + 1;

      // if comment is not exists already
      if (document.getElementById(data.path) == null) {
        if (document.getElementById('root__comments').style.display === 'block') {
          var commentHTML = RootHTMLGen.getCommentHTML(data);
          $('#root__comments__list').append(commentHTML);
          document.getElementById('root__comments__empty').style.display = 'none';
        }
      }
    } else if (/^views\/[^\/]*$/.test(data.path)) {
      $('#root__looks__previews').append(RootHTMLGen.getLookPreviewHTML(data));
      var preview = getLookPreviewNode(data.path);
      switch (MDSCommon.findValueByName(data.fields, 'type')) {
        case 'codepen':
          var codepenScript = document.createElement('script');
          codepenScript.setAttribute('src', 'https://assets.codepen.io/assets/embed/ei.js');
          preview.appendChild(codepenScript);
          break;
        case 'table':
          break;
      }
      $(preview).data('look-data', data);
      var viewsCount = parseInt(document.getElementById('root__tabs_views_count').innerText);
      document.getElementById('root__tabs_views_count').innerText = viewsCount + 1;
      if (viewsCount === 0) {
        document.getElementById('root__looks__empty').style.display = 'none';
      }
    }
  });

  Mydataspace.on('entities.delete.res', function(data) {
    if (/^likes\//.test(data.path)) {
      document.getElementById('root__counters_likes_count').innerText =
        parseInt(document.getElementById('root__counters_likes_count').innerText) - 1;
      resetMyLike(data);
    } else if (/^comments\//.test(data.path)) {
      document.getElementById('root__tabs_comments_count').innerText =
        parseInt(document.getElementById('root__tabs_comments_count').innerText) - 1;
      document.getElementById('root__counters_comments_count').innerText =
        parseInt(document.getElementById('root__counters_comments_count').innerText) - 1;

      var comment = document.getElementById(data.path);
      if (comment != null) {
        comment.parentNode.removeChild(comment);
        if (document.getElementById('root__comments__list').children.length === 0) {
          document.getElementById('root__comments__empty').style.display = 'block';
        }
      }
    } else if (/^views\/[^\/]*$/.test(data.path)) {
      $(getLookPreviewNode(data.path)).parent().remove();

      var viewsCount = parseInt(document.getElementById('root__tabs_views_count').innerText);
      document.getElementById('root__tabs_views_count').innerText = viewsCount - 1;
      if (viewsCount <= 1) {
        document.getElementById('root__looks__empty').style.display = 'block';
        document.getElementById('root__looks__content_wrap').style.display = 'none';
        $('body').css('overflow', '');
      } else {
        if (currentLook && currentLook.path === data.path) {
          selectLook();
        }
      }
    }
  });

  function setMyLike(data) {
    document.getElementById('root__counters_likes').setAttribute('data-like-path', data.path);
    document.getElementById('root__counters_likes').classList.add('root_counter--active');
  }

  function resetMyLike(data) {
    var path = document.getElementById('root__counters_likes').getAttribute('data-like-path');
    if (MDSCommon.isPresent(path) && (MDSCommon.isBlank(data) || data.path === path)) {
      document.getElementById('root__counters_likes').removeAttribute('data-like-path');
      document.getElementById('root__counters_likes').classList.remove('root_counter--active');
    }
  }

  function requestMyLike() {
    Mydataspace.request('entities.getMyChildren', MDSCommon.extend(DATA, { path: 'likes' })).then(function(result) {
      var children = result.children;
      if (children.length > 0) {
        setMyLike(children[0]);
      } else {
        resetMyLike();
      }
    });
  }

  $('#look_modal__table_reset').click(function() {
    refreshLookTableColumns();
  });
  $('#look_modal__table_remove').click(function() {
    $$('look_modal__table').remove($$('look_modal__table').getSelectedId(true));
  });
  $('#look_modal__table_add').click(function() {
    var id = $$('look_modal__table').add({ value: '', title: '', width: 200 });
    $$('look_modal__table').editCell(id, 'value');
  });

  function refreshLookTableColumns() {
    $$('look_modal__table').clearAll();
    Mydataspace.entities.get(MDSCommon.extend(DATA, {
      path: $('#look_modal__table_path').val(),
      children: true
    })).then(function(data) {
      var child = data.children[0];
      var formattedData = child.fields.filter(function(field) {
        return field.name.indexOf('$') !== 0;
      }).map(function(field) {
        return {
          value: field.name,
          title: field.name,
          width: 200
        }
      });
      $$('look_modal__table').parse(formattedData);
    });
  }
}

function initRootViewEditor(options) {
  var $look_modal = $('#look_modal');

  var TYPES = ['codepen', 'table', 'list'];

  TYPES.forEach(function(type) {
    $('#look_modal__' + type + '_tab_link').click(function() {
      TYPES.forEach(function(otherType) {
        $('#look_modal__' + otherType + '_tab').removeClass('active');
        $('#look_modal__' + otherType + '_wrap').addClass('hidden');
      });
      $look_modal.data('look-type', type);
      $('#look_modal__' + type + '_tab').addClass('active');
      $('#look_modal__' + type + '_wrap').removeClass('hidden');
      $('#look_modal__' + type).focus();
    });
  });

  $look_modal.on('show.bs.modal', function () {
    $('#look_modal__title_err').text('');
    $('#look_modal__codepen_err').text('');

    $('#look_modal__title').val('');
    $('#look_modal__description').val('');
    $('#look_modal__codepen').val('');
    $('#look_modal__table_path').val('');

    $$('look_modal__table').clearAll();

    $('#look_modal__tabs').children().removeClass('active');
    $('#look_modal__type_forms').children().addClass('hidden');

    $look_modal.data('look-type', null);
    $('#look_modal__locker').addClass('hidden');
  });

  $look_modal.on('shown.bs.modal', function () {
    $('#look_modal__title').focus();
  });

  webix.ui({
    view: 'datatable',
    id: 'look_modal__table',
    container: 'look_modal__table_webix',
    columns:[
      { id: 'value', header: options.table.column_value, width: 200, editor: 'text' },
      { id: 'title', header: options.table.column_title, width: 345 - 17, editor: 'text' },
      { id: 'width', header: options.table.column_width, hidden: true, editor: 'int' }
    ],
    height: 200,
    select: 'multiselect',
    headerRowHeight: 30,
    autowidth: true,
    drag: true,
    scrollX: false,
    editable: true,
    editaction: 'dblclick'
  });
}