UIHelper = {
  SCREEN_XS: 700,
  /**
   * Number of entities received by single request.
   */
  NUMBER_OF_ENTITIES_LOADED_AT_TIME: 20,
  /**
   * Width of label of field in form.
   */
  LABEL_WIDTH: 120,
  APP_LABEL_WIDTH: 160,
  NUMBER_OF_FIXED_INPUTS_IN_FIELDS_FORM: 7,

  ENTITY_TREE_SHOW_MORE_ID: 'show_more_23478_3832ee',
  ENTITY_TREE_DUMMY_ID: 'dummy_483__4734_47e4',
  ENTITY_LIST_SHOW_MORE_ID: 'show_more_47384_3338222',

  /**
   *
   * @param {string} id
   */
  isTreeShowMore: function (id) {
    return (new RegExp(UIHelper.ENTITY_TREE_SHOW_MORE_ID + '(\\?\\d+)?$')).test(id);
  },

  isListShowMore: function (id) {
    return (new RegExp(UIHelper.ENTITY_LIST_SHOW_MORE_ID + '(\\?\\d+)?$')).test(id);
  },

  setVisible: function (components, isVisible) {
    if (!Array.isArray(components)) {
      components = [components];
    }
    for (var i in components) {
      var component = components[i];
      if (typeof component === 'string') {
        component = $$(component);
      }
      if (isVisible) {
        component.show();
      } else {
        component.hide();
      }
    }
  },

  /**
   * User can only view entities. All buttons for manipulations is hidden in
   * this mode.
   */
  isViewOnly: function () {
    return window.location.hash != null &&
      window.location.hash !== '' &&
      window.location.hash !== '#';
  },

  getEntityTypeByPath: function (path) {
    var depth = UIHelper.getEntityDepthByPath(path);
    switch (path) {
      case '':
        return 'root';
      case 'protos':
      case 'resources':
      case 'tasks':
      case 'likes':
      case 'comments':
      case 'processes':
      case 'views':
      case 'website':
      case 'wizards':
        return path;
      default:
        if (/^wizards\/[^\/]+$/.test(path)) {
          return 'wizard';
        }
        if (/^tasks\/[^\/]+$/.test(path)) {
          return 'task';
        }
        if (/^tasks\/[^\/]+\/logs$/.test(path)) {
          return 'logs';
        }
        if (/^tasks\/[^\/]+\/logs\/[^\/]+$/.test(path)) {
          return 'log';
        }
        if (path.startsWith('protos/') && depth === 2) {
          return 'proto';
        }
        if (path.startsWith('likes/') && depth === 2) {
          return 'like';
        }
        if (path.startsWith('comments/') && depth === 2) {
          return 'comment';
        }
        if (path.startsWith('views/') && depth === 2) {
          return 'view';
        }
        if (path.startsWith('resources/')) {
          return 'resource';
        }
    }
    return 'none';
  },

  getIconByPath: function (path, isEmpty, isOpened) {
    var icon = UIConstants.ENTITY_ICONS[UIHelper.getEntityTypeByPath(path)];
    if (icon) {
      return icon;
    }
    if (isEmpty) {
      return 'file-o';
    } else {
      return isOpened ? 'folder-open' : 'folder';
    }
  },

  getEntityDepthByPath: function (path) {
    var depth = 1;
    for (var i = 0; i < path.length; i++) {
      if (path[i] === '/') {
        depth++;
      }
    }
    return depth;
  },

  isTaskPath: function (path) {
    if (path == null) {
      return false;
    }
    return path.startsWith('tasks/') &&
      UIHelper.getEntityDepthByPath(path) === 2;
  },

  isProtoPath: function (path) {
    if (path == null) {
      return false;
    }
    return path.startsWith('protos/') &&
      UIHelper.getEntityDepthByPath(path) === 2;
  },

  isProto: function (id) {
    if (id == null) {
      return false;
    }
    var identity = Identity.dataFromId(id);
    return UIHelper.isProtoPath(identity.path);
  },

  popupCenter: function (url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }
    return newWindow;
  },

  isValidJWT: function (token) {
    return isValidJWT(token);
  },

  getWizardUrlById: function (id) {
    var data = Identity.dataFromId(id);
    if (MDSCommon.isPresent(data.path)) {
      var path = MDSCommon.getParentPath(data.path);
      return 'https://wizard.myda.space/' + data.root + (MDSCommon.isPresent(path) ? '/' + path : '') + '/' + 'item.html'
    } else {
      return 'https://wizard.myda.space/' + data.root + '/' + 'root.html'
    }
  },

  loadDatasourcesToCombo: function (id) {
    Mydataspace.request('entities.get', {
      root: 'datasources',
      path: 'data',
      children: true,
      //fields: ['name']
    }).then(function (data) {
      var options = data.children.map(function (ds) {
        var id = MDSCommon.getPathName(ds.path);
        return {
          id: id,
          value: MDSCommon.findValueByName(ds.fields, 'name') || id
        }
      });
      $$(id).getList().clearAll();
      $$(id).getList().parse(options);
    });
  }
};
