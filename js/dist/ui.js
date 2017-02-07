var STRINGS_ON_DIFFERENT_LANGUAGES = {
  EN: {
    YES: 'Yes',
    NO: 'No',
    CLOSE: 'Close',
    SHOW_MORE: 'Show more...',
    EDIT_SCRIPT: 'Edit Script:',
    SAVE_ENTITY: 'Save Entity',
    RUN_SCRIPT: 'Run',
    ONLY_READ: 'Only Read',
    ADD_ENTITY: 'New Entity',
    SEARCH: 'Search...',
    DELETE_ENTITY: 'Delete Entity',
    DELETE_ENTITY_SHORT: 'Delete',
    CREATE_CHILDREN: 'Create Children',
    CREATE_ONE_CHILD: 'Create One Child',
    OTHERS_CAN: 'Others Can',
    CREATE: 'Create',
    CANCEL: 'Cancel',
    ALREADY_LOGGED_IN: 'Already logged in',
    TYPE: 'Type',
    STRING: 'String',
    REAL: 'Real',
    INT: 'Int',
    DESCRIPTION: 'Description',
    NO_ENTITY: 'No field exists',
    ADD_ROOT: 'New Root',
    ADD_FIELD: 'New Field',
    REFRESH: 'Refresh',
    SAVE: 'Save',
    SAVE_APP: 'Save',
    REFRESH_APP: 'Refresh',
    DELETE: 'Delete',
    DELETE_APP: 'Delete App',
    NEW_APP: 'New App',
    NAME: 'Name',
    LOGO_URL: 'Logo URL',
    SITE_URL: 'Site URL',
    CLIENT_ID: 'API Key',
    VALUE: 'Value',
    CHILD_PROTO: 'Child Proto',
    FIELDS: 'Fields',
    NO_FIELDS: 'No fields exists',
    MY_APPS: 'My Apps',
    MY_DATA: 'My Data',
    SIGN_OUT: 'Sign out',
    CONNECT_TO_FACEBOOK: 'Connect through Facebook',
    CONNECT_TO_GOOGLE: 'Connect through Google',
    REALLY_DELETE: 'You really want delete this entity?',
    NO_DATA: 'You have no data',
    NO_APPS: 'You have no apps',
    DOCS: 'Documentation',
    DEMOS: 'Demos',
    GET_STARTED: 'Get Started',
    SIGN_IN: 'Sign In',
    NOTHING: 'Nothing',
    READ_AND_VIEW_CHILDREN: 'Read and view children',
    PROTO_IS_FIXED: 'Is Fixed',
    MAX_NUMBER_OF_CHILDREN: 'Children limit',
    EDIT_ENTITY: 'Edit',
    SAVE_ENTITY: 'Save',
    REFRESH_ENTITY: 'Refresh',
    CANCEL_ENTITY: 'View',
    SIGN_OUT: 'Log Out',
    SEARCH_BY_ROOTS: 'All yours',
    SEARCH_BY_ENTITIES: 'Filter by name...',
    ROOT_FIELDS: {
      avatar: 'Icon',
      name: 'Name',
      tags: 'Tags',
      description: 'Description',
      websiteURL: 'Website URL',
      readme: 'README'
    },
    ROOT_FIELD_PLACEHOLDERS: {
      name: 'Human readable name of your root',
      tags: 'Keywords describing root',
      description: 'Main about root',
      websiteURL: 'Website where data of root are used',
      readme: 'Markdown-formatted text about the root'
    }
  },
  RU: {
    YES: 'Да',
    NO: 'Нет',
    CLOSE: 'Закр.',
    SHOW_MORE: 'Показать ещё...',
    EDIT_SCRIPT: 'Ред. скрипта:',
    SAVE_ENTITY: 'Сохранить элемент',
    RUN_SCRIPT: 'Вып.',
    ONLY_READ: 'Только читать',
    ADD_ENTITY: 'Новый эл-т',
    SEARCH: 'Поиск...',
    DELETE_ENTITY: 'Удалить элемент',
    DELETE_ENTITY_SHORT: 'Удал.',
    CREATE_CHILDREN: 'Создавать дочерние элементы',
    CREATE_ONE_CHILD: 'Создать один дочерний элемент',
    OTHERS_CAN: 'Другие могут',
    CREATE: 'Создать',
    CANCEL: 'Отмена',
    ALREADY_LOGGED_IN: 'Уже в системе',
    TYPE: 'Тип',
    STRING: 'Строка',
    REAL: 'Число',
    INT: 'Целое число',
    DESCRIPTION: 'Описание',
    NO_ENTITY: 'Нет полей',
    ADD_ROOT: 'Нов. корень',
    ADD_FIELD: 'Нов. поле',
    REFRESH: 'Обновить',
    SAVE: 'Сохр.',
    SAVE_APP: 'Сохр.',
    REFRESH_APP: 'Обновить прил.',
    DELETE: 'Удал.',
    DELETE_APP: 'Удалить прил.',
    NEW_APP: 'Новое прил.',
    NAME: 'Имя',
    LOGO_URL: 'Лого',
    SITE_URL: 'Сайт',
    CLIENT_ID: 'Ключ API',
    VALUE: 'Значение',
    CHILD_PROTO: 'Прот. доч. эл-та',
    FIELDS: 'Поля',
    NO_FIELDS: 'Нет ни одного поля',
    MY_APPS: 'Мои приложения',
    MY_DATA: 'Мои данные',
    SIGN_OUT: 'Выход',
    CONNECT_TO_FACEBOOK: 'Войти через Facebook',
    CONNECT_TO_GOOGLE: 'Войти через Google',
    REALLY_DELETE: 'Вы действительно хотите удалить этот элемент?',
    NO_DATA: 'У вас нет данных',
    NO_APPS: 'У вас нет приложений',
    REALLY_DELETE_APP: 'Вы действительно хотите удалить это приложение?',
    DOCS: 'Документация',
    DEMOS: 'Примеры',
    GET_STARTED: 'С чего начать',
    SIGN_IN: 'Войти',
    NOTHING: 'Ничего',
    READ_AND_VIEW_CHILDREN: 'Чтение и просм. доч. эл.',
    PROTO_IS_FIXED: 'Зафиксирован',
    MAX_NUMBER_OF_CHILDREN: 'Доч. эл-тов',
    EDIT_ENTITY: 'Ред.',
    SAVE_ENTITY: 'Сохр.',
    REFRESH_ENTITY: 'Обнов.',
    CANCEL_ENTITY: 'Пр.',
    SIGN_OUT: 'Выход',
    SEARCH_BY_ROOTS: 'Поиск по корням...',
    SEARCH_BY_ENTITIES: 'Фильтр по имени...'
  }
};


var LANGUAGE = window.localStorage && window.localStorage.getItem('language') || 'EN';
var STRINGS = STRINGS_ON_DIFFERENT_LANGUAGES[LANGUAGE];

webix.protoUI({
	name: "ace-editor",
	defaults:{
		mode: "javascript",
		theme: "chrome"
	},
	$init:function(config){
		this.$ready.push(this._render_cm_editor);
	},

	_render_cm_editor:function(){
		webix.require([
			"ace/src-noconflict/ace.js"
		], this._render_when_ready, this);
	},

	_render_when_ready:function(){
        var basePath = webix.codebase+"ace/src-noconflict/";

        ace.config.set("basePath", basePath);
        ace.config.set("modePath", basePath);
        ace.config.set("workerPath", basePath);
        ace.config.set("themePath", basePath);

		this.editor = ace.edit(this.$view);
        this.editor.$blockScrolling = Infinity;

        this.editor.setOptions({
			fontFamily: "Monaco,consolas,monospace",
			fontSize: "14px"
		});

        if(this.config.theme)
            this.editor.setTheme("ace/theme/"+this.config.theme);
        if(this.config.mode)
            this.editor.getSession().setMode("ace/mode/"+this.config.mode);
        if(this.config.value)
            this.setValue(this.config.value);
		if (this._focus_await)
            this.focus();

        this.editor.navigateFileStart();
        this.callEvent("onReady", [this.editor]);
	},

	setValue:function(value){
		if(!value && value !== 0)
			value = "";

		this.config.value = value;
		if(this.editor){
			this.editor.setValue(value, -1);
		}
	},

	getValue:function(){
		return this.editor ? this.editor.getValue() : this.config.value;
	},

	focus:function(){
		this._focus_await = true;
		if (this.editor)
			this.editor.focus();
	},

	getEditor:function(){
		return this.editor;
	}

}, webix.ui.view, webix.EventSystem);

var Router = {
  isEmpty: function() {
    return window.location.hash == null ||
           window.location.hash === '' ||
           window.location.hash === '#';
  },
  /**
   * Route links to single root.
   */
  isRoot: function() {
    return !Router.isEmpty() && window.location.hash.indexOf('*') < 0;
  },
  getRoot: function() {
    return window.location.hash.substring(1);
  },
  isSearch: function() {
    return !Router.isEmpty() && !Router.isRoot();
  },
  getSearch: function() {
    var s = window.location.hash.substring(1);
    if (Router.isMe()) {
      s = s.substring(3);
    }
    return s.replace(/\*/g, '');
  },
  isMe: function() {
    return window.location.hash.indexOf('#me:') === 0;
  }
};

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
  NUMBER_OF_FIXED_INPUTS_IN_FIELDS_FORM: 7,

  ENTITY_TREE_SHOW_MORE_ID: 'show_more_23478_3832ee',
  ENTITY_TREE_DUMMY_ID: 'dummy_483__4734_47e4',
  ENTITY_LIST_SHOW_MORE_ID: 'show_more_47384_3338222',

  ENTITY_ICONS: {
      'root': 'database',
      'protos': 'cubes',
      'proto': 'cube',
      'tasks': 'code',
      'task': 'file-code-o',
      'logs': 'history',
      'log': 'file-movie-o',
      'resources': 'cloud-upload',
      'resource': 'file-image-o'
  },

  /**
   * User can only view entities. All buttons for manipulations is hidden in
   * this mode.
   */
  isViewOnly: function() {
    return window.location.hash != null &&
           window.location.hash !== '' &&
           window.location.hash !== '#';
  },

  getEntityTypeByPath: function(path) {
    var depth = UIHelper.getEntityDepthByPath(path);
    switch (path) {
      case '':
        return 'root';
      case 'protos':
      case 'resources':
      case 'tasks':
        return path;
      default:
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
          if (path.startsWith('resources/')) {
            return 'resource';
          }
    }
    return 'none';
  },

  getIconByPath: function(path, isEmpty, isOpened) {
    var icon = UIHelper.ENTITY_ICONS[UIHelper.getEntityTypeByPath(path)];
    if (icon) {
        return icon;
    }
    if (isEmpty) {
      return 'file-o';
    } else {
      return isOpened ? 'folder-open' : 'folder';
    }
  },

  getEntityDepthByPath: function(path) {
   var depth = 1;
   for (var i = 0; i < path.length; i++) {
     if (path[i] === '/') {
       depth++;
     }
   }
   return depth;
  },

  isProtoPath: function(path) {
    if (path == null) {
      return false;
    }
    return path.startsWith('protos/') &&
           UIHelper.getEntityDepthByPath(path) === 2;
  },

  isProto: function(id) {
    if (id == null) {
      return false;
    }
    var identity = Identity.dataFromId(id);
    return UIHelper.isProtoPath(identity.path);
  },

  popupCenter: function(url, title, w, h) {
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

  isValidJWT: function(token) {
    return isValidJWT(token);
    // try {
    //   var json = UIHelper.parseJWT(token);
    // } catch(e) {
    //   return false;
    // }
    // return json.exp < Date.now();
  },

  parseJWT: function(token) {
    return parseJWT(token);
    // if (MDSCommon.isBlank(token)) {
    //     throw new Error('JWT can\t be empty');
    // }
    // var parts = token.split('.');
    // var base64Url = parts[1];
    // if (base64Url == null) {
    //     throw new Error('JWT has Illegal format');
    // }
    // var base64 = base64Url.replace(/\-/g, '+').replace(/_/g, '/');
    // // About niceties of window.btoa method.
    // // https://developer.mozilla.org/ru/docs/Web/API/WindowBase64/btoa
    // var json = decodeURIComponent(escape(window.atob(base64)));
    // return JSON.parse(json);
  }
};

var Fields = {
  MAX_STRING_FIELD_LENGTH: 1000,
  MAX_TEXT_FIELD_LENGTH: 1000000,
  FIELD_INDEXED_ICONS: {
    'on': 'sort-alpha-asc', // 'sort-alpha-asc', 'sort-amount-asc',
    'fulltext': 'text-height',
    'off': 'ban'
  },

  FIELD_TYPES: {
    s: {
      title: STRINGS.STRING,
      isValidValue: function(value) {
        return value.toString().length < Fields.MAX_STRING_FIELD_LENGTH;
      }
    },
    j: {
      title: 'Text',
      isValidValue: function(value) {
        return value.toString().length < Fields.MAX_TEXT_FIELD_LENGTH;
      }
    },
    r: {
      title: STRINGS.REAL,
      isValidValue: function(value) {
        return MDSCommon.isNumber(value);
      }
    },
    i: {
      title: STRINGS.INT,
      isValidValue: function(value) {
        return MDSCommon.isInt(value);
      }
    },
    u: {
      title: 'URL',
      isValidValue: function(value) {
        return value.toString().length < Fields.MAX_STRING_FIELD_LENGTH;
      }
    }
  },

  FIELD_TYPE_ICONS: {
    s: 'commenting',
    w: 'lock',
    j: 'align-justify',
    i: 'italic',
    r: 'calculator',
    b: 'check-square-o',
    d: 'calendar-o',
    u: 'link'
  },

  expandFields: function(fields) {
      if (fields == null || (!Array.isArray(fields) && typeof fields !== 'object')) {
          return fields;
      }
      if (Array.isArray(fields)) {
          return fields.map(function(field) {
              return Fields.expandField(field);
          });
      } else {
          var ret = {};
          for (var key in fields) {
              var field = Fields.expandField(fields[key], key);
              ret[field.name] = field;
          }
          return ret;
      }
  },

  expandField: function(field, name) {
    if (name == null) {
      name = '';
    }
    if (field == null) {
      return field;
    }
    for (var key in field) {
      if (field[key] != null && typeof field[key] === 'object') {
        if (name !== '') {
          name += '.';
        }
        name += key;
        return Fields.expandField(field[key], name);
      }
    }

    if (name !== '') {
        field.name = name;
    }

    return field;
  },

  getFieldIndexedAsArrayOfIdValue: function() {
    var ret = [];
    for (var key in Fields.FIELD_INDEXED) {
      ret.push({
        id: key,
        value: Fields.FIELD_INDEXED[key].value
      });
    }
    return ret;
  },

  getFieldTypesAsArrayOfIdValue: function() {
    var ret = [];
    for (var key in Fields.FIELD_TYPES) {
      ret.push({
        id: key,
        value: Fields.FIELD_TYPES[key].title
      });
    }
    return ret;
  },

  /**
   * Compate two collections of fields to determine what fields are changed,
   * deleted or created.
   * @param dirtyFields
   * @param currentFieldNames
   * @param oldFields
   * @returns {*} Object with fields for update.
   */
  getFieldsForSave: function(dirtyFields, currentFieldNames, oldFields) {
    if (typeof dirtyFields === 'undefined') dirtyFields = {};
    var deletedFields = {};
    for (var fieldName in oldFields) {
      if (currentFieldNames.indexOf(fieldName) === -1) {
        deletedFields[fieldName] = { value: null };
      }
    }
    return MDSCommon.mapToArray(MDSCommon.extend(dirtyFields, deletedFields));
  }
};

var Identity = {
  /**
   * Returns UI-formatted entity data from data received from server.
   */
  entityFromData: function(data) {
    var entityId = Identity.idFromData(data);
    var children = [];
    if (!MDSCommon.isBlank(data.numberOfChildren) && data.numberOfChildren > 0) {
      children.push({
        id: Identity.childId(entityId, UIHelper.ENTITY_TREE_DUMMY_ID),
        value: ''
      });
    }
    return {
      id: entityId,
      value: Identity.nameFromData(data),
      count: data.numberOfChildren,
      associatedData: data,
      data: children
    };
  },

  /**
   * Returns name of entity or root from data.
   */
  nameFromData: function(data) {
    if (MDSCommon.isBlank(data.path)) {
      return data.root;
    }
    return data.path.split('/').slice(-1)[0];
  },

  /**
   * Forms string with id of entity.
   * @param data Entity data included root & path.
   * @returns string Entity id
   */
  idFromData: function(data) {
    if (MDSCommon.isBlank(data.path)) {
      return data.root;
    }
    return data.root + ':' + data.path;
  },

  dataFromId: function(id) {
    var idParts = id.split(':');
    var ret = {
      root: idParts[0],
      path: idParts.length === 1 ? '' : idParts[1]
    };
    return ret;
  },

  childId: function(entityId, childSubPath) {
    if (entityId.indexOf(':') !== -1) {
      return entityId + '/' + childSubPath;
    }
    return entityId + ':' + childSubPath;
  },

  parentId: function(entityId) {
    var i = entityId.lastIndexOf('/');
    if (i === -1) {
      var parts = entityId.split(':');
      if (parts.length === 1) {
        return 'root';
      }
      return parts[0];
    }
    return entityId.slice(0, i);
  },
};

UIControls = {
  getFieldTypeSelectTemplate: function() {
    var options = [];
    for (let id in Fields.FIELD_TYPES) {
      options.push({ id: id, value: Fields.FIELD_TYPES[id].title });
    }
    return {
      view: 'combo',
      required: true,
      name: 'type',
      value: 's',
      // template:"#name#",
      label: STRINGS.TYPE,
      options: options
    };
  },

  getEntityTypeSelectTemplate: function() {
    return {
      view: 'combo',
      label: STRINGS.OTHERS_CAN,
      name: 'othersCan',
      value: 'view_children',
      options: [
        { id: 'nothing', value: STRINGS.NOTHING },
        { id: 'read', value: STRINGS.ONLY_READ },
        { id: 'view_children', value: STRINGS.READ_AND_VIEW_CHILDREN },
        { id: 'create_child', value: STRINGS.CREATE_ONE_CHILD },
        { id: 'create_children', value: STRINGS.CREATE_CHILDREN }
      ],
      labelWidth: UIHelper.LABEL_WIDTH
    };
  },

  getOnForFormWindow: function(id) {
    var formId = id + '_form';
    var windowId = id + '_window';
    return {
      onHide: function() {
        $$(formId).clearValidation();
        $$(formId).setValues($$(formId).getCleanValues());
      },
      onShow: function() {
        $$(formId).focus();
        $$(formId).setDirty(false);
        $$(windowId + '__cancel_button').define('hotkey', 'escape');
      }
    };
  },

  addSpinnerToWindow: function(windowId) {
    $$(windowId.replace(/_window$/, '_form')).disable();
    var head = $$(windowId).getNode().querySelector('.webix_win_head > .webix_view > .webix_template');
    var spinner = document.createElement('i');
    spinner.className = 'fa fa-cog fa-spin fa-2x fa-fw webix_win_head_spinner';
    head.appendChild(spinner);
  },

  removeSpinnerFromWindow: function(windowId) {
    var head = $$(windowId).getNode().querySelector('.webix_win_head > .webix_view > .webix_template');
    var spinners = head.getElementsByClassName('webix_win_head_spinner');
    if (spinners.length !== 0) {
      head.removeChild(spinners[0]);
    }
    $$(windowId.replace(/_window$/, '_form')).enable();
  },

  getSubmitCancelForFormWindow: function(id, isLongExecutable) {
    if (isLongExecutable == null) {
      isLongExecutable = true;
    }
    var formId = id + '_form';
    var windowId = id + '_window';
    return { cols: [
        { view: 'button',
          id: windowId + '__create_button',
          value: STRINGS.CREATE,
          type: 'form',
          click: function() {
            if (isLongExecutable) {
              UIControls.addSpinnerToWindow(windowId);
            }
            $$(formId).callEvent('onSubmit');
          }
        },
        { view: 'button',
          id: windowId + '__cancel_button',
          value: STRINGS.CANCEL,
          click: function() { $$(windowId).hide() }
        }
      ]
    }
  },

  getLoginButtonView: function(providerName) {
    var authProvider = Mydataspace.getAuthProvider(providerName);
    return {
      view: 'button',
      label: authProvider.title,
      type: 'iconButton',
      icon: authProvider.icon,
      width: 250,
      height: 50,
      css: 'login_panel__' + providerName + '_button',
      click: function() {
        if (Mydataspace.isLoggedIn()) {
          throw new Error(STRINGS.ALREADY_LOGGED_IN);
        }
        Mydataspace.login(providerName);
      }
    };
  }
};

function EntityForm() {
  this.editing = false;
  this.loadedListeners = [];
}

EntityForm.prototype.onLoaded = function(listener) {
  this.loadedListeners.push(listener);
};

EntityForm.prototype.emitLoaded = function(data) {
  this.loadedListeners.forEach(function(listener) {
    listener(data);
  });
};

/**
 * Switchs Entity Form to edit/view mode.
 */
EntityForm.prototype.setEditing = function(editing) {
  this.editing = editing;
  $$('edit_script_window').hide();
  if (editing) {
    $$('EDIT_ENTITY_LABEL').hide();
    $$('SAVE_ENTITY_LABEL').show();
    $$('CANCEL_ENTITY_LABEL').show();
    // $$('REFRESH_ENTITY_LABEL').hide();
    const  entityType = UIHelper.getEntityTypeByPath(Identity.dataFromId(this.selectedId).path);
    if (entityType === 'task') {
      $$('RUN_SCRIPT_LABEL').show();
    } else {
      $$('RUN_SCRIPT_LABEL').hide();
    }
    $$('ADD_FIELD_LABEL').show();
    webix.html.addCss($$('edit_script_window__toolbar').getNode(), 'entity_form__toolbar--edit');
    webix.html.addCss($$('entity_form__toolbar').getNode(), 'entity_form__toolbar--edit');
    $$('edit_script_window__editor').getEditor().setReadOnly(false);
  } else {
    $$('EDIT_ENTITY_LABEL').show();
    $$('SAVE_ENTITY_LABEL').hide();
    $$('CANCEL_ENTITY_LABEL').hide();
    $$('RUN_SCRIPT_LABEL').hide();
    // $$('REFRESH_ENTITY_LABEL').show();
    $$('ADD_FIELD_LABEL').hide();
    webix.html.removeCss($$('edit_script_window__toolbar').getNode(), 'entity_form__toolbar--edit');
    webix.html.removeCss($$('entity_form__toolbar').getNode(), 'entity_form__toolbar--edit');
    $$('edit_script_window__editor').getEditor().setReadOnly(true);
  }
};

EntityForm.prototype.isEditing = function() {
  return this.editing;
};

EntityForm.prototype.listen = function() {
  Mydataspace.on('entities.delete.res', function() {
    $$('entity_form').disable();
  });
};

EntityForm.prototype.isProto = function() {
  return UIHelper.isProto(this.selectedId);
};

EntityForm.prototype.setSelectedId = function(id) {
  if (this.selectedId === id) {
    return;
  }
  this.selectedId = id;
  $$('edit_script_window').hide();
  this.refresh();
};


EntityForm.prototype.setLogRecords = function(fields, ignoredFieldNames, addLabelIfNoFieldsExists) {
  if (!Array.isArray(ignoredFieldNames)) {
    ignoredFieldNames = [];
  }
  if (addLabelIfNoFieldsExists == null) {
    addLabelIfNoFieldsExists = true;
  }
  var viewFields = document.getElementById('view__fields');
  if (MDSCommon.isBlank(fields)) {
    viewFields.innerHTML =
      addLabelIfNoFieldsExists ?
      '<div class="view__no_fields_exists">' + STRINGS.NO_FIELDS + '</div>' :
      '';
  } else {
    viewFields.innerHTML = '';
    var numberOfChildren = 0;
    for (var i in fields) {
      var field = fields[i];
      if (ignoredFieldNames.indexOf(field.name) >= 0) {
        continue;
      }
      numberOfChildren++;
      var html = MDSCommon.textToHtml(field.value);
      var status = field.name.split('_')[1];
      var recordClass = 'view__log_record--' + status;
      if (MDSCommon.isBlank(html)) {
        switch (status) {
          case 'success':
            html = 'Script executed successfully';
            break;
          case 'fail':
            html = 'Script failed';
            break;
        }
      }
      var divFd = $('<div class="view__log_record ' + recordClass + '">' +
                        html +
                    '</div>').appendTo(viewFields);
    }
  }
  if (numberOfChildren === 0) {
    viewFields.innerHTML =
      addLabelIfNoFieldsExists ?
      '<div class="view__no_fields_exists">' + STRINGS.NO_FIELDS + '</div>' :
      '';
  }
  return viewFields;
};


EntityForm.prototype.setViewFields = function(fields,
                                              ignoredFieldNames,
                                              addLabelIfNoFieldsExists,
                                              comparer,
                                              classResolver) {
  if (!Array.isArray(ignoredFieldNames)) {
    ignoredFieldNames = [];
  }
  if (addLabelIfNoFieldsExists == null) {
    addLabelIfNoFieldsExists = true;
  }
  var viewFields = document.getElementById('view__fields');
  if (MDSCommon.isBlank(fields)) {
    viewFields.innerHTML =
      addLabelIfNoFieldsExists ?
      '<div class="view__no_fields_exists">' + STRINGS.NO_FIELDS + '</div>' :
      '';
  } else {
    viewFields.innerHTML = '';
    var numberOfChildren = 0;
    if (comparer) {
        fields.sort(comparer);
    }
    for (var i in fields) {
      var field = fields[i];
      if (ignoredFieldNames.indexOf(field.name) >= 0) {
        continue;
      }
      numberOfChildren++;
      var html = MDSCommon.textToHtml(field.value);
      var multiline = html.indexOf('\n') >= 0;
      var multilineClass = multiline ? 'view__field_value--multiline' : '';
      var multilineEnd = multiline ? '    <div class="view__field_value__end"></div>\n' : '';
      var fieldClass = classResolver ? classResolver(field) : '';
      var divFd = $('<div class="view__field ' + fieldClass + '">\n' +
                    '  <div class="view__field_name">\n' +
                    '    <div class="view__field_name_box">\n' +
                           field.name +
                    '    </div>\n' +
                    '  </div>\n' +
                    '  <div class="view__field_value ' + multilineClass + '">\n' +
                    '    <div class="view__field_value_box">\n' +
                           (MDSCommon.isPresent(field.value) ? html : '&mdash;') +
                    '    </div>\n' +
                         multilineEnd +
                    '  </div>\n' +
                    '</div>').appendTo(viewFields);
      if (multiline) {
        divFd.data('value', field.value);
      }
    }
  }
  if (numberOfChildren === 0) {
    viewFields.innerHTML =
      addLabelIfNoFieldsExists ?
      '<div class="view__no_fields_exists">' + STRINGS.NO_FIELDS + '</div>' :
      '';
  }
  return viewFields;
};

EntityForm.prototype.setRootView = function(data) {
  $.ajax({ url: '/fragments/root-view.html', method: 'get' }).then(function(html) {
    var view = document.getElementById('view');
    var websiteURL = MDSCommon.findValueByName(data.fields, 'websiteURL');
    var description = MDSCommon.findValueByName(data.fields, 'description');
    var tags = MDSCommon.findValueByName(data.fields, 'tags');
    var readme = MDSCommon.findValueByName(data.fields, 'readme');

    view.innerHTML = html;
    var ava = MDSCommon.findValueByName(data.fields, 'avatar');
    if (MDSCommon.isPresent(ava)) {
      ava = Mydataspace.options.apiURL + '/avatars/sm/' + ava + '.png';
    }
    document.getElementById('view__overview_image').src = ava || '/images/icons/root.svg';
    document.getElementById('view__title').innerText =
      MDSCommon.findValueByName(data.fields, 'name') || MDSCommon.getPathName(data.root);

    document.getElementById('view__tags').innerText = tags || '';


    if (tags && websiteURL) {
      document.getElementsByClassName('view__overview_image_wrap')[0].classList.add('view__overview_image_wrap--large');
      document.getElementById('view__overview_image').classList.add('view__overview_image--large');
    } else if (tags || websiteURL) {
      document.getElementsByClassName('view__overview_image_wrap')[0].classList.add('view__overview_image_wrap--medium');
      document.getElementById('view__overview_image').classList.add('view__overview_image--medium');
    }


    if (MDSCommon.isBlank(websiteURL)) {
      document.getElementById('view__websiteURL').style.display = 'none';
    } else {
      document.getElementById('view__websiteURL').style.display = 'block';
      document.getElementById('view__websiteURL').innerText = websiteURL;
      document.getElementById('view__websiteURL').href = websiteURL;
    }

    if (MDSCommon.isBlank(description)) {
      if (MDSCommon.isBlank(readme)) {
        document.getElementById('view__description').innerHTML = '<i>No description or README provided.</i>';
      } else {
        document.getElementById('view__description').style.display = 'none';
      }
    } else {
      document.getElementById('view__description').innerText = description;
    }

    if (MDSCommon.isBlank(readme)) {
      document.getElementById('view__content').style.display = 'none';
    } else {
      document.getElementById('view__content').style.display = 'block';
    }
    document.getElementById('view__readme').innerHTML = md.render(readme);
    var viewFields = this.setViewFields(data.fields,
                                        ['name',
                                         'avatar',
                                         'description',
                                         'websiteURL',
                                         'readme',
                                         'tags'],
                                        false);
    $(viewFields).on('click', '.view__field', function() {
      $(viewFields).find('.view__field--active').removeClass('view__field--active');
      var value = $(this).data('value');
      if (value != null) {
        $$('edit_script_window__editor').setValue(value);
        if (!$$('edit_script_window').isVisible()) {
          $$('edit_script_window').show();
        }
      } else {
        $$('edit_script_window').hide();
      }
      $(this).addClass('view__field--active');
    });
  }.bind(this));
};

EntityForm.prototype.setTaskView = function(data) {
  $.ajax({ url: '/fragments/task-view.html', method: 'get' }).then(function(html) {
    var view = document.getElementById('view');
    view.innerHTML = html;
    document.getElementById('view__overview_icon').className =
      'view__overview_icon fa fa-' +
      UIHelper.getIconByPath(data.path,
                             data.numberOfChildren === 0,
                             false);
    document.getElementById('view__title').innerText =
      MDSCommon.getPathName(data.path);

    const description = data.fields.filter(function(x) { return x.name === 'description'; })[0];
    if (description != null) {
      $('#view__description').text(description.value);
    } else {
      $('#view__description').remove();
    }
    var viewFields =
        this.setViewFields(data.fields,
                           ['status', 'statusText', 'interval', 'description'],
                           description == null,
                           function(x, y) {
                             if (x.name === 'main.js') {
                                 return 1;
                             }
                             if (y.name === 'main.js') {
                               return -1;
                             }
                             var isScriptX = /.*\.js$/.test(x.name);
                             var isScriptY = /.*\.js$/.test(y.name);
                             if (isScriptX && isScriptY || !isScriptX && !isScriptY) {
                                 if (x < y) {
                                     return -1;
                                 } else if (x.name > y.name) {
                                     return 1;
                                 } else {
                                     return 0;
                                 }
                             } if (isScriptX) {
                                 return 1;
                             } else {
                                 return -1;
                             }
                         }, function(x) {
                           if (x.name === 'main.js') {
                               return 'view__field--script view__field--script--main';
                           }
                           if (/.*\.js$/.test(x.name)) {
                             return 'view__field--script';
                           }
                           return '';
                         });
    var status = MDSCommon.findValueByName(data.fields, 'status');
    if (status != null) {
      var statusClass;
      switch (status) {
        case 'success':
          statusClass = 'view__status--success';
          break;
        case 'fail':
          statusClass = 'view__status--fail';
          break;
      }
      if (statusClass) {
        document.getElementById('view__status').classList.add(statusClass);
      }

      var statusText = MDSCommon.findValueByName(data.fields, 'statusText');
      if (!statusText) {
          switch (status) {
            case 'success':
              statusText = 'Script executed successfully';
              break;
            case 'fail':
              statusText = 'Script failed';
              break;
          }
      }
      document.getElementById('view__status').innerText = statusText;
    }

    var interval = MDSCommon.findValueByName(data.fields, 'interval') || 'paused';
    document.getElementById('view__interval_' + interval).classList.add('view__check--checked');

    $(viewFields).on('click', '.view__field', function() {
      $(viewFields).find('.view__field--active').removeClass('view__field--active');
      var value = $(this).data('value');
      if (value != null) {
        $$('edit_script_window__editor').setValue(value);
        if (!$$('edit_script_window').isVisible()) {
          $$('edit_script_window').show();
        }
      } else {
        $$('edit_script_window').hide();
      }
      $(this).addClass('view__field--active');
    });
  }.bind(this));
};

EntityForm.prototype.setEntityView = function(data) {
  const self = this;
  const entityType = UIHelper.getEntityTypeByPath(Identity.dataFromId(self.selectedId).path);

  $.ajax({ url: '/fragments/entity-view.html', method: 'get' }).then(function(html) {
    var view = document.getElementById('view');
    view.innerHTML = html;
    if (entityType === 'resource') {
      const resourceType = MDSCommon.findValueByName(data.fields, 'type');
      const resourceName = MDSCommon.getPathName(data.path);
      const resoucesHost = Mydataspace.options.apiURL;
      switch (resourceType) {
        case 'avatar':
          document.getElementById('view__overview_icon').parentNode.innerHTML =
            '<img src="' + resoucesHost + '/avatars/sm/' + resourceName + '.png" class="view__overview_image" />';
          break;
        case 'image':
          document.getElementById('view__overview_icon').parentNode.innerHTML =
            '<img src="' + resoucesHost + '/previews/sm/' + resourceName + '.jpg" class="view__overview_image" />';
          break;
        default:
          document.getElementById('view__overview_icon').className =
            'view__overview_icon fa fa-' + UIHelper.getIconByPath(data.path, true, false);
      }
    } else {
      document.getElementById('view__overview_icon').className =
        'view__overview_icon fa fa-' +
        UIHelper.getIconByPath(data.path,
                               data.numberOfChildren === 0,
                               false);
    }
    document.getElementById('view__title').innerText = MDSCommon.getPathName(data.path);

    var viewFields;
    if (entityType === 'proto') {
      $('#view__description').remove();
      viewFields = this.setViewFields(data.fields);
    } else {
      const description = data.fields.filter(function(x) { return x.name === 'description'; })[0];
      if (description != null) {
        $('#view__description').text(description.value);
      } else {
        $('#view__description').remove();
      }
      viewFields = this.setViewFields(data.fields, ['description'], description == null);
    }

    $(viewFields).on('click', '.view__field', function() {
      $(viewFields).find('.view__field--active').removeClass('view__field--active');
      var value = $(this).data('value');
      if (value != null) {
        $$('edit_script_window__editor').setValue(value);
        if (!$$('edit_script_window').isVisible()) {
          $$('edit_script_window').show();
        }
      } else {
        $$('edit_script_window').hide();
      }
      $(this).addClass('view__field--active');
    });
  }.bind(this));
};

EntityForm.prototype.setLogView = function(data) {
  $.ajax({ url: '/fragments/log-view.html', method: 'get' }).then(function(html) {
    var view = document.getElementById('view');
    view.innerHTML = html;
    document.getElementById('view__overview_icon').className =
      'view__overview_icon fa fa-' +
      UIHelper.getIconByPath(data.path,
                             data.numberOfChildren === 0,
                             false);
    document.getElementById('view__title').innerText =
      MDSCommon.getPathName(data.path);
    var viewFields = this.setLogRecords(data.fields);
    $(viewFields).on('click', '.view__field', function() {
      $(viewFields).find('.view__field--active').removeClass('view__field--active');
      var value = $(this).data('value');
      if (value != null) {
        $$('edit_script_window__editor').setValue(value);
        if (!$$('edit_script_window').isVisible()) {
          $$('edit_script_window').show();
        }
      } else {
        $$('edit_script_window').hide();
      }
      $(this).addClass('view__field--active');
    });
  }.bind(this));
};

EntityForm.prototype.setView = function(data) {
  $('#view').append('<div class="view__loading"></div>');
  if (MDSCommon.isBlank(data.path)) {
    this.setRootView(data);
  } else if (UIHelper.getEntityTypeByPath(data.path) === 'task') {
    this.setTaskView(data);
  } else if (UIHelper.getEntityTypeByPath(data.path) === 'log') {
    this.setLogView(data);
  } else {
    this.setEntityView(data);
  }
  $$('entity_form').hide();
  $$('entity_view').show();
};

EntityForm.prototype.setData = function(data) {
  var formData = {
    name: Identity.nameFromData(data),
    othersCan: data.othersCan,
    description: data.description,
    maxNumberOfChildren: data.maxNumberOfChildren,
    isFixed: data.isFixed,
    childPrototype: Identity.idFromData(data.childPrototype)
  };
  this.clear();
  $$('entity_form').setValues(formData);
  if (MDSCommon.isBlank(data.path)) { // root entity
    this.addRootFields(data.fields);
  } else {
    this.addFields(data.fields, false, UIHelper.isProtoPath(data.path));
  }
  this.setClean();
  $$('entity_view').hide();
  $$('entity_form').show();
};

EntityForm.prototype.refresh = function() {
  const self = this;
  const entityType = UIHelper.getEntityTypeByPath(Identity.dataFromId(self.selectedId).path);
  const isWithMeta = self.isEditing();
  $$('entity_form').disable();
  const req = !isWithMeta ? 'entities.get' : 'entities.getWithMeta';
  Mydataspace.request(req, Identity.dataFromId(self.selectedId), function(data) {
    if (!isWithMeta || entityType === 'resource') {
      self.setView(data);

      if (data.mine) {
        $$('DELETE_ENTITY_SHORT_LABEL').show();
      } else {
        $$('DELETE_ENTITY_SHORT_LABEL').hide();
      }

      if (entityType === 'resource' || !data.mine) {
        $$('EDIT_ENTITY_LABEL').hide();
      } else {
        $$('EDIT_ENTITY_LABEL').show();
      }
    } else {
      self.setData(data);
      if (self.isProto()) {
        $$('PROTO_IS_FIXED_LABEL').show();
      } else {
        $$('PROTO_IS_FIXED_LABEL').hide();
      }
      $$('entity_form').enable();
    }
    self.emitLoaded(data);
    if ($$('edit_script_window').isVisible() && UI.entityForm.editScriptFieldId != null) {
      const editedField = $$(UI.entityForm.editScriptFieldId);
      if (editedField != null) {
        $$('edit_script_window__editor').setValue(editedField.getValue());
        $$('edit_script_window__editor').getEditor().getSession().setUndoManager(new ace.UndoManager());
      } else {
        UI.entityForm.editScriptFieldId = null;
      }
    }
  }, function(err) {
    UI.error(err);
    $$('entity_form').enable();
  });
};

/**
 * Creates new entity by data received from the 'New Entity' form.
 * @param formData data received from form by method getValues.
 */
//EntityForm.prototype.createByFormData = function(formData) {
//  var newEntityId = Identity.childId(this.selectedId, formData.name);
//  var data = Identity.dataFromId(newEntityId);
//  data.fields = [];
//  data.type = formData.type;
//  Mydataspace.emit('entities.create', data);
//};

EntityForm.prototype.delete = function() {
  $$('entity_form').disable();
  Mydataspace.request('entities.delete', Identity.dataFromId(this.selectedId), function(data) {
    // do nothing because selected item already deleted.
  }, function(err) {
    UI.error(err);
    $$('entity_form').enable();
  });
};

EntityForm.prototype.updateToolbar = function() {
  // if (!$$('entity_form').isDirty()) {
  //   $$('SAVE_ENTITY_LABEL').disable();
  // } else {
  //   $$('SAVE_ENTITY_LABEL').enable();
  // }
};

/**
 * Marks entity form as unchanged.
 */
EntityForm.prototype.setClean = function() {
  $$('entity_form').setDirty(false);
  this.updateToolbar();
  $$('entity_form').enable();
};

/**
 * Marks entity form as changed.
 */
EntityForm.prototype.setDirty = function() {
  $$('entity_form').setDirty(true);
  this.updateToolbar();
};


EntityForm.prototype.save = function() {
  var dirtyData = webix.CodeParser.expandNames($$('entity_form').getDirtyValues());
  var existingData =
    webix.CodeParser.expandNames(
      Object.keys($$('entity_form').elements).reduce(function(ret, current) {
        ret[current] = '';
        return ret;
      }, {}));
  var oldData = webix.CodeParser.expandNames($$('entity_form')._values);
  MDSCommon.extendOf(dirtyData, Identity.dataFromId(this.selectedId));

  dirtyData.fields =
    Fields.expandFields(
      Fields.getFieldsForSave(Fields.expandFields(dirtyData.fields), // dirty fields
                                Object.keys(Fields.expandFields(existingData.fields) || {}), // current exists field names
                                Fields.expandFields(oldData.fields))); // old fields
  $$('entity_form').disable();
  if (typeof dirtyData.childPrototype !== 'undefined') {
    dirtyData.childPrototype = Identity.dataFromId(dirtyData.childPrototype);
  }
  Mydataspace.request('entities.change', dirtyData, function(res) {
    this.refresh();
    $$('entity_form').enable();
  }.bind(this), function(err) {
    UI.error(err);
    $$('entity_form').enable();
  }.bind(this));
};

/**
 * Removes all fields from the form.
 */
EntityForm.prototype.clear = function() {
  var rows = $$('entity_form').getChildViews();
  for (var i = rows.length - 1; i >= UIHelper.NUMBER_OF_FIXED_INPUTS_IN_FIELDS_FORM; i--) {
    var row = rows[i];
    if (typeof row !== 'undefined') {
      $$('entity_form').removeView(row.config.id);
    }
  }
};

EntityForm.prototype.addFields = function(fields, setDirty, isProto) {
  for (var i in fields) {
    this.addField(fields[i], setDirty, isProto);
  }
};

EntityForm.prototype.addRootFields = function(fields, setDirty) {
  var ROOT_FIELDS = [
    'avatar',
    'name',
    'tags',
    'websiteURL',
    'description',
    'readme'
  ];

  fields.sort(function(x, y) {
    var xIndex = ROOT_FIELDS.indexOf(x.name);
    var yIndex = ROOT_FIELDS.indexOf(y.name);
    if (xIndex >= 0 && yIndex < 0) {
      return -1;
    }
    if (xIndex < 0 && yIndex >= 0) {
      return 1;
    }
    if (xIndex < 0 && yIndex < 0) {
      if (x.name < y.name) {
        return -1;
      } else if (x.name > y.name) {
        return 1;
      } else {
        return 0;
      }
    }
    if (xIndex < yIndex) {
      return -1;
    } else if (xIndex > yIndex) {
      return 1;
    } else {
      return 0;
    }
  });

  for (var i in fields) {
    if (ROOT_FIELDS.indexOf(fields[i].name) >= 0) {
      this.addRootField(fields[i], setDirty);
    } else {
      this.addField(fields[i], setDirty, false);
    }
  }
};

EntityForm.prototype.onUploadAvatar = function(event) {
  var formData = new FormData();
  var file = event.target.files[0];
  if (!file.type.match('image.*')) {
    alert('Only images');
    return;
  }
  formData.append('root', Identity.dataFromId(this.selectedId).root);
  formData.append('type', 'avatar');
  formData.append('file', file);
  $.ajax({
    url: Mydataspace.options.apiURL + '/v1/entities/upload',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    cache: false,
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('authToken')
    }
  }).done(function(res) {
    var entityName = res.resources[0];
    $$('entity_form__root_avatar_value').setValue(entityName);
    $('#entity_form__root_img').prop('src', Mydataspace.options.apiURL + '/avatars/sm/' + entityName + '.png');
  }).fail(function(err) {
    console.log(err);
  });
};

EntityForm.prototype.addRootField = function(data) {
  if (typeof $$('entity_form__' + data.name) !== 'undefined') {
    throw new Error('Field with this name already exists');
  }
  $$('NO_FIELDS_LABEL').hide();

  if (data.name === 'avatar') {
    $$('entity_form').addView({
      id: 'entity_form__' + data.name,
      css: 'entity_form__field entity_form__field--without-overflow',
      cols: [
        { view: 'text',
          value: data.name,
          name: 'fields.' + data.name + '.name',
          hidden: true
        },
        { view: 'text',
          value: data.type,
          id: 'entity_form__' + data.name + '_type',
          name: 'fields.' + data.name + '.type',
          hidden: true
        },
        { view: 'text',
          value: data.value,
          name: 'fields.' + data.name + '.value',
          id: 'entity_form__root_avatar_value',
          hidden: true
        },
        {
          view: 'label',
          css: 'entity_form__field_label_avatar',
          label: '<div style="visibility: hidden">fake</div>' +
                 '<div class="entity_form__field_label">' +
                  STRINGS.ROOT_FIELDS[data.name] +
                 '</div>' +
                 '<div class="entity_form__field_label_ellipse_right"></div>' +
                 '<div class="entity_form__field_label_ellipse"></div>',
          width: UIHelper.LABEL_WIDTH,
          height: 38,
        },
        {
          borderless: true,
          css: 'entity_form__root_img_template',
          template: '<img id="entity_form__root_img" class="entity_form__root_img" src="' +
                      (MDSCommon.isPresent(data.value) ? Mydataspace.options.apiURL + '/avatars/sm/' + data.value + '.png' : '/images/icons/root.svg') +
                    '" alt="Icon" />',
          width: 32
        },
        { width: 16 },
        {
          borderless: true,
          css: 'entity_form__root_img_upload_template',
          template: '<label class="entity_form__root_img_upload_lbl">' +
                    ' <input type="file" ' +
                    '        onchange="UI.entityForm.onUploadAvatar(event);"' +
                    '        required />' +
                    ' <span>Upload</span>' +
                    '</label>',
        },
        { width: 6 },
        {
          view: 'button',
          label: 'Browse',
          on: {
            onClick: function() {
            }
          }
        },
        { width: 6 },
        {
          view: 'button',
          label: 'Remove',
          click: function() {
            $$('entity_form__root_avatar_value').setValue('');
            document.getElementById('entity_form__root_img').setAttribute('src', '/images/icons/root.svg');
          }
        }
      ]
    });
    return;
  }

  $$('entity_form').addView({
    id: 'entity_form__' + data.name,
    css: 'entity_form__field',
    cols: [
      { view: 'text',
        value: data.name,
        name: 'fields.' + data.name + '.name',
        hidden: true
      },
      { view: 'text',
        value: data.type,
        id: 'entity_form__' + data.name + '_type',
        name: 'fields.' + data.name + '.type',
        hidden: true
      },
      { view: 'text',
        label: '<div style="visibility: hidden">fake</div>' +
               '<div class="entity_form__field_label">' +
                STRINGS.ROOT_FIELDS[data.name] +
               '</div>' +
               '<div class="entity_form__field_label_ellipse_right"></div>' +
               '<div class="entity_form__field_label_ellipse"></div>',
        labelWidth: UIHelper.LABEL_WIDTH,
        name: 'fields.' + data.name + '.value',
        id: 'entity_form__' + data.name + '_value',
        value: data.value,
        height: 38,
        css: 'entity_form__text_label',
        placeholder: STRINGS.ROOT_FIELD_PLACEHOLDERS[data.name]
      }
    ]
  });
};

EntityForm.prototype.addField = function(data, setDirty, isProto) {
  if (typeof $$('entity_form__' + data.name) !== 'undefined') {
    throw new Error('Field with this name already exists');
  }
  $$('NO_FIELDS_LABEL').hide();
  if (typeof setDirty === 'undefined') {
    setDirty = false;
  }
  if (setDirty) {
    var values = webix.copy($$('entity_form')._values);
  }

  $$('entity_form').addView({
    id: 'entity_form__' + data.name,
    css: 'entity_form__field entity_form__field--text',
    cols: [
      { view: 'text',
        value: data.name,
        name: 'fields.' + data.name + '.name',
        hidden: true
      },
      { view: 'text',
        value: data.type,
        id: 'entity_form__' + data.name + '_type',
        name: 'fields.' + data.name + '.type',
        hidden: true
      },
      { view: 'text',
        value: data.indexed,
        id: 'entity_form__' + data.name + '_indexed',
        name: 'fields.' + data.name + '.indexed',
        hidden: true
      },
      { view: data.type === 'j' ? 'textarea' : 'text',
        label: '<div style="visibility: hidden">fake</div>' +
               '<div class="entity_form__field_label">' +
                data.name +
               '</div>' +
               '<div class="entity_form__field_label_ellipse_right"></div>' +
               '<div class="entity_form__field_label_ellipse"></div>',
        labelWidth: UIHelper.LABEL_WIDTH,
        name: 'fields.' + data.name + '.value',
        id: 'entity_form__' + data.name + '_value',
        value: data.value,
        height: 32,
        css: 'entity_form__text_label',
        readonly: data.type === 'j',
        on: {
          onBlur: function() {
            if (this.editScriptFieldId == 'entity_form__' + data.name + '_value') {
              this.editScriptFieldId = null;
            }
          },

          onFocus: function() {
            if (data.type === 'j') {
              this.editScriptFieldId = 'entity_form__' + data.name + '_value';
              $$('edit_script_window__editor').setValue($$(UI.entityForm.editScriptFieldId).getValue());
              $$('edit_script_window__editor').getEditor().getSession().setUndoManager(new ace.UndoManager());
              if (!$$('edit_script_window').isVisible()) {
                $$('edit_script_window').show();
              }
            } else {
              $$('edit_script_window').hide();
            }
          }.bind(this)
        }
      },
      { view: 'button',
        width: 30,
        type: 'iconButton',
        icon: Fields.FIELD_TYPE_ICONS[data.type],
        css: 'entity_form__field_type_button',
        popup: 'entity_form__field_type_popup',
        options: Fields.getFieldTypesAsArrayOfIdValue(),
        id: 'entity_form__' + data.name + '_type_button',
        on: {
          onItemClick: function() {
            this.currentFieldName = data.name;
            $$('entity_form__field_type_popup_list').unselectAll();
          }.bind(this)
        }
      },
      { view: 'button',
        type: 'icon',
        css: 'entity_form__field_delete',
        icon: 'remove',
        width: 10,
        click: function() {
          this.deleteField(data.name);
        }.bind(this)
      },
      { view: 'button',
        width: 10,
        type: 'iconButton',
        icon: !isProto ? null : Fields.FIELD_INDEXED_ICONS[data.type === 'j' ? 'fulltext' : (data.indexed || 'off').toString()],
        css: 'entity_form__field_indexed_button',
        popup: 'entity_form__field_indexed_popup',
        disabled: !isProto || data.type === 'j',
        id: 'entity_form__' + data.name + '_indexed_button',
        on: {
          onItemClick: function() {
            this.currentFieldName = data.name;
            $$('entity_form__field_indexed_list').unselectAll();
          }.bind(this)
        }
      }
    ]
  });
  if (setDirty) {
    $$('entity_form')._values = values;
    this.updateToolbar();
  }
};

EntityForm.prototype.deleteField = function(name) {
  var values = webix.copy($$('entity_form')._values);
  $$('entity_form').removeView('entity_form__' + name);
  $$('entity_form')._values = values;
  this.setDirty();
  var rows = $$('entity_form').getChildViews();
  if (rows.length === UIHelper.NUMBER_OF_FIXED_INPUTS_IN_FIELDS_FORM) {
    $$('NO_FIELDS_LABEL').show();
  }
};

/**
 * Created with JetBrains PhpStorm.
 * User: fifti
 * Date: 15.08.16
 * Time: 13:59
 * To change this template use File | Settings | File Templates.
 */
function EntityList() {

}

EntityList.prototype.setReadOnly = function(isReadOnly) {
  if (isReadOnly) {
    $$('ADD_ENTITY_LABEL').hide();
  } else {
    $$('ADD_ENTITY_LABEL').show();
  }
};

EntityList.prototype.onCreate = function(data) {
  var parentId = Identity.parentId(Identity.idFromData(data));
  var entity = Identity.entityFromData(data);
  if (this.getRootId() === parentId) {
    $$('entity_list').add(entity, 1);
    $$('entity_list').select(entity.id);
  }
};

EntityList.prototype.listen = function() {
  Mydataspace.on('entities.delete.res', function(data) {
    var entityId = Identity.idFromData(data);

    if ($$('entity_list').getFirstId() === entityId) { // Parent item "."
      return;
    }

    if ($$('entity_list').getItem(entityId) == null) {
      return;
    }

    if (entityId === this.getCurrentId()) { // Select other item if selected item is deleted.
      let nextId = $$('entity_list').getPrevId(entityId) || $$('entity_list').getNextId(entityId);
      $$('entity_list').select(nextId);
    }

    $$('entity_list').remove(entityId);
  }.bind(this));

  Mydataspace.on('entities.create.res', this.onCreate.bind(this));
};

EntityList.prototype.setRootId = function(id) {
  if (this.rootId === id) {
    return;
  }
  this.rootId = id;

  // var subscription = Identity.dataFromId(id);
  // var childrenSubscription = Identity.dataFromId(id);
  // childrenSubscription.path += '/*';
  // Mydataspace.emit('entities.subscribe', subscription);
  // Mydataspace.emit('entities.subscribe', childrenSubscription);

  this.refreshData();
};

EntityList.prototype.getRootId = function() {
  return this.rootId;
};

EntityList.prototype.setCurrentId = function(id) {
   this.currentId = id;
};

EntityList.prototype.getCurrentId = function() {
  return this.currentId;
};

/**
 * Reload data (from server) of entity list.
 * Uses entityList_fill internally.
 */
EntityList.prototype.refreshData = function() {
  var identity = Identity.dataFromId(this.getRootId());
  var search = $$('entity_list__search').getValue();
  if (MDSCommon.isPresent(search)) {
    identity['filterByName'] = search;
  }
  $$('entity_list').disable();
  Mydataspace.request('entities.getChildren', identity, function(data) {
    var showMoreChildId =
      Identity.childId(this.getRootId(), UIHelper.ENTITY_LIST_SHOW_MORE_ID);
    var entityId = Identity.idFromData(data);
    var children = data.children.filter(x => x.root !== 'root' || x.path !== '').map(Identity.entityFromData);
    if (this.getRootId() === entityId) {
      if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
        children[children.length - 1] = {
          id: Identity.childId(entityId, UIHelper.ENTITY_LIST_SHOW_MORE_ID),
          value: STRINGS.SHOW_MORE
        }
      }
      this.fill(entityId, children, data);
      $$('entity_list').addCss(showMoreChildId, 'entity_list__show_more_item');
    }
    this.setReadOnly(!data.mine);
    $$('entity_list').enable();
  }.bind(this), function(err) { UI.error(err); });
};

/**
 * Fills entity list by items from children array.
 *
 * @param parentEntityId Root entity (selected in entity tree).
 *                       Displays as '.' in entity list.
 * @param children Items of entity list.
 */
EntityList.prototype.fill = function(parentEntityId, children, data) {
  $$('entity_list').clearAll();
  for (var i in children) {
    $$('entity_list').add(children[i], -1);
  }
  $$('entity_list').add({ id: parentEntityId,  value: '.', count: data.numberOfChildren }, 0);
  $$('entity_list').select(parentEntityId);
};

/**
 * Creates new entity by data received from the 'New Entity' form.
 * @param formData data received from form by method getValues.
 */
EntityList.prototype.createByFormData = function(formData) {
  var newEntityId = Identity.childId(this.getRootId(), formData.name);
  var data = Identity.dataFromId(newEntityId);
  data.fields = [];
  data.othersCan = formData.othersCan;
  Mydataspace.emit('entities.create', data);
};

EntityList.prototype.addChildren = function(children) {
  var showMoreChildId =
    Identity.childId(this.getRootId(), UIHelper.ENTITY_LIST_SHOW_MORE_ID);

  var startIndex;
  if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
    delete children[children.length - 1];
    startIndex = this.count() + 1;
  } else {
    $$('entity_list').remove(showMoreChildId);
    startIndex = this.count() + 2;
  }

  var offset = 0;
  for (var i in children) {
    $$('entity_list').add(children[i], startIndex + offset);
    offset++;
  }
};

EntityList.prototype.showMore = function() {
  var req = Identity.dataFromId(this.getRootId());
  req.offset = this.count();
  Mydataspace.request('entities.getChildren', req, function(data) {
    var children = data.children.map(Identity.entityFromData);
    this.addChildren(children);
  }.bind(this));
};

/**
 * Calculates number of items of entity list.
 * @returns {number} Number of items in entity list.
 */
EntityList.prototype.count = function() {
  var lastId = $$('entity_list').getLastId();
  var lastIndex = $$('entity_list').getIndexById(lastId);
  if (lastId.endsWith(UIHelper.ENTITY_LIST_SHOW_MORE_ID)) {
    return lastIndex - 1;
  }
  return lastIndex;
};

function EntityTree() {

}

EntityTree.prototype.getCurrentId = function() {
  return this.currentId;
};

EntityTree.prototype.setCurrentId = function(id) {
  this.currentId = id;
};

EntityTree.prototype.resolveChildren = function(id) {
  return new Promise(function(resolve, reject) {
    var firstChildId = $$('entity_tree').getFirstChildId(id);
    if (firstChildId != null && firstChildId !== Identity.childId(id, UIHelper.ENTITY_TREE_DUMMY_ID)) {
      resolve();
      return;
    }
    // Load children to first time opened node.
    Mydataspace.request('entities.getChildren', Identity.dataFromId(id), function(data) {
      var entityId = Identity.idFromData(data);
      var children = data.children.filter(x => x.root !== 'root' || x.path !== '').map(Identity.entityFromData);
      UI.entityTree.setChildren(entityId, children);
      resolve();
    }, function(err) {
      reject(err);
    });
  });
};

EntityTree.prototype.setCurrentIdToFirst = function() {
  var firstId = $$('entity_tree').getFirstId();
  this.setCurrentId(firstId);
  return firstId;
};

EntityTree.prototype.onCreate = function(data) {
  var parentId = Identity.parentId(Identity.idFromData(data));
  var entity = Identity.entityFromData(data);
  if (parentId === 'root') {
    $$('entity_tree').add(entity, 0);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }
    $$('entity_tree').select(entity.id);
  } else if (!MDSCommon.isNull($$('entity_tree').getItem(parentId)) &&
    MDSCommon.isNull($$('entity_tree').getItem(Identity.childId(parentId, UIHelper.ENTITY_TREE_DUMMY_ID)))) {
    $$('entity_tree').add(entity, 0, parentId);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }

    this.resolveChildren(parentId).then(function() {
      $$('entity_tree').open(entity.id);
    });

  }
};

EntityTree.prototype.listen = function() {
  Mydataspace.on('entities.delete.res', function(data) {
    var entityId = Identity.idFromData(data);

    if ($$('entity_tree').getItem(entityId) == null) {
      return;
    }

    if (entityId === this.getCurrentId()) { // Select other item if selected item is deleted.
      let nextId = $$('entity_tree').getPrevSiblingId(entityId) ||
                   $$('entity_tree').getNextSiblingId(entityId) ||
                   $$('entity_tree').getParentId(entityId);
      $$('entity_tree').select(nextId);
    }

    $$('entity_tree').remove(entityId);
  }.bind(this));

  Mydataspace.on('entities.create.res', this.onCreate.bind(this));
};

EntityTree.getViewOnlyRoot = function() {
  return window.location.hash.substring(1).split('/')[0];
};

EntityTree.prototype.handleFormattedData = function(formattedData) {
  $$('entity_tree').clearAll();
  this.currentId = null;
  $$('entity_tree').parse(formattedData);
  $$('entity_tree').enable();
};

EntityTree.prototype.requestRoots = function(onlyMine, reqData, selectedId) {
  var req = onlyMine ? 'entities.getMyRoots' : 'entities.getRoots';
  var self = this;
  Mydataspace.request(req, reqData, function(data) {
    // convert received data to treeview format and load its to entity_tree.
    self.handleFormattedData(data['roots'].map(Identity.entityFromData));
    if (selectedId) {
      self.setCurrentId(selectedId);
    }
    UI.pages.updatePageState('data');
  }, function(err) {
    UI.error(err);
    $$('entity_tree').enable();
  });
};

EntityTree.prototype.refresh = function() {
  var self = this;
  $$('entity_tree').disable();
  if (Router.isEmpty()) {
    self.requestRoots(true, {});
  } else if (Router.isSearch()) {
    self.requestRoots(Router.isMe(), {
      search: Router.getSearch()
    });
  } else if (Router.isRoot()) {
    Mydataspace.request('entities.get', {
      root: Router.getRoot(),
      path: ''
    }, function(data) {
      if (data.mine) {
        self.requestRoots(true, {}, data.root);
      } else {
        // convert received data to treeview format and load its to entity_tree.
        self.handleFormattedData([Identity.entityFromData(data)]);
      }
      UI.pages.updatePageState('data');
    }, function(err) {
      UI.error(err);
      $$('entity_tree').enable();
    });
  }
};

/**
 * Override entity's children of nodes recursively.
 */
EntityTree.prototype.setChildren = function(entityId, children) {
  var dummyChildId = Identity.childId(entityId, UIHelper.ENTITY_TREE_DUMMY_ID);
  var showMoreChildId = Identity.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID);
  var firstChildId = $$('entity_tree').getFirstChildId(entityId);
  if (firstChildId != null && firstChildId !== dummyChildId) {
    return;
  }
  if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
    children[children.length - 1] = {
      id: Identity.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID),
      value: STRINGS.SHOW_MORE
    }
  }
  children.reverse().forEach(function(entity) {
    $$('entity_tree').add(entity, 0, entityId);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }
  }.bind(this));
  if (firstChildId !== null) {
    $$('entity_tree').remove(firstChildId);
  }
  $$('entity_tree').addCss(showMoreChildId, 'entity_tree__show_more_item');
};

EntityTree.prototype.addChildren = function(entityId, children) {
  var showMoreChildId = Identity.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID);
  if (!$$('entity_tree').exists(showMoreChildId)) {
    return;
  }
  var offset;
  if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
    delete children[children.length - 1];
    offset = 1;
  } else {
    $$('entity_tree').remove(showMoreChildId);
    offset = 0;
  }
  children.forEach(function(entity) {
    var nChildren = this.numberOfChildren(entityId);
    $$('entity_tree').add(entity, nChildren - offset, entityId);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }
  }.bind(this));
};

EntityTree.prototype.showMore = function(id) {
  var req = Identity.dataFromId(id);
  req.offset = this.numberOfChildren(id);
  Mydataspace.request('entities.getChildren', req, function(data) {
    var entityId = Identity.idFromData(data);
    var children = data.children.map(Identity.entityFromData);
    this.addChildren(entityId, children);
  }.bind(this));
};

EntityTree.prototype.numberOfChildren = function(id) {
  var n = 0;
  var prevChildId = null;
  var childId = $$('entity_tree').getFirstChildId(id);
  while (childId != null && prevChildId !== childId) {
    n++;
    prevChildId = childId;
    childId = $$('entity_tree').getNextSiblingId(childId);
  }
  return n;
};

EntityTree.prototype.lastChildId = function(id) {
  var prevChildId = null;
  var childId = $$('entity_tree').getFirstChildId(id);
  while (childId != null && prevChildId !== childId) {
    prevChildId = childId;
    childId = $$('entity_tree').getNextSiblingId(childId);
  }
  return prevChildId;
};

function Pages() {
  this.currentPage = 'data';
}

Pages.prototype.setCurrentPage = function(page) {
  if (this.currentPage === page) {
    return;
  }
  this.currentPage = page;
  switch (page) {
    case 'data':
      $$('my_data_panel').show();
      $$('my_apps_panel').hide();
      break;
    case 'apps':
      $$('my_data_panel').hide();
      $$('my_apps_panel').show();
      break;
    default:
      throw new Error('Illegal page: ' + this.currentPage);
  }
  if ($$('menu__item_list').getSelectedId() !== page) {
    $$('menu__item_list').select(page);
  }
  this.updatePageState(page);
};

Pages.prototype.updatePageState = function(page) {
  if (this.currentPage !== page) {
    return;
  }
  switch (page) {
    case 'apps':
      if ($$('app_list').getFirstId() == null) {
        document.getElementById('no_items').innerText = STRINGS.NO_APPS;
        document.getElementById('no_items').style.display = 'block';
        $$('my_apps_panel__right_panel').hide();
        $$('my_apps_panel__resizer').hide();
      } else {
        document.getElementById('no_items').style.display = 'none';
        $$('my_apps_panel__right_panel').show();
        $$('my_apps_panel__resizer').show();
      }
      break;
    case 'data':
      if ($$('entity_tree').getFirstId() == null) {
        document.getElementById('no_items').style.display = 'block';
        document.getElementById('no_items__new_root_input').focus();
        $$('my_data_panel__right_panel').hide();
        $$('my_data_panel__resizer_2').hide();
        $$('my_data_panel__central_panel').hide();
        $$('my_data_panel__resizer_1').hide();
      } else {
        document.getElementById('no_items').style.display = 'none';
        $$('my_data_panel__right_panel').show();
        $$('my_data_panel__resizer_2').show();
        $$('my_data_panel__central_panel').show();
        $$('my_data_panel__resizer_1').show();
      }
      break;
    default:
      throw new Error('Illegal page: ' + this.currentPage);
  }
};

Pages.prototype.refreshCurrentPage = function() {
  this.refreshPage(this.currentPage);
};

Pages.prototype.refreshPage = function(page, selectOnlyCurrentPage) {
  switch (page) {
    case 'apps':
      UI.refreshApps();
      break;
    case 'data':
      UI.entityTree.refresh();
      break;
    default:
      throw new Error('Illegal page: ' + page);
  }
  if ($$('menu__item_list').getSelectedId() !== page
      && (selectOnlyCurrentPage && this.currentPage === page || !selectOnlyCurrentPage)) {
    $$('menu__item_list').select(page);
  }
};

var UILayout = {
  HEADER_HEIGHT: 55,
  windows: {}
};

UILayout.windows.addApp = {
    view: 'window',
    id: 'add_app_window',
    width: 300,
    position: 'center',
    modal: true,
    head: STRINGS.NEW_APP,
    on: UIControls.getOnForFormWindow('add_app'),
    body: {
      view: 'form',
      id: 'add_app_form',
      borderless: true,
      on: {
        onSubmit: function() {
          if (!$$('add_app_form').validate()) {
            return;
          }
          // Send request to create new app
          var data = $$('add_app_form').getValues();
          data.path = '';
          data.fields = [];
          Mydataspace.request('apps.create', data, function() {
            UIControls.removeSpinnerFromWindow('add_app_window');
          }, function() {
            ;
          });
        }
      },
      elements: [
        { view: 'text', id: 'NAME_LABEL_3', label: STRINGS.NAME, required: true, name: 'name', labelWidth: UIHelper.LABEL_WIDTH },
        { view: 'text', id: 'SITE_URL_LABEL', label: STRINGS.SITE_URL, required: true, name: 'url', labelWidth: UIHelper.LABEL_WIDTH },
        UIControls.getSubmitCancelForFormWindow('add_app')
      ]
    }
};

UILayout.windows.addRoot = {
    view: 'window',
    id: 'add_root_window',
    width: 350,
    position: 'center',
    modal: true,
    head: STRINGS.ADD_ROOT,
    on: UIControls.getOnForFormWindow('add_root'),
    body: {
      view: 'form',
      id: 'add_root_form',
      borderless: true,
      on: {
        onSubmit: function() {
          if (!$$('add_root_form').validate()) {
            return;
          }
          // Send request to create new root entity
          var data = $$('add_root_form').getValues();
          data.path = '';
          data.fields = [];
          Mydataspace.request('entities.create', data, function() {
            $$('add_root_window').hide();
            UIControls.removeSpinnerFromWindow('add_root_window');
          }, function(err) {
            UIControls.removeSpinnerFromWindow('add_root_window');
            if (err.errors != null) {
              for (let i in err.errors) {
                let e = err.errors[i];
                switch (e.type) {
                  case 'unique violation':
                    if (e.path === 'entities_root_path') {
                      $$('add_root_form').elements.root.define('invalidMessage', 'Name already exists');
                      $$('add_root_form').markInvalid('root', true);
                    }
                    break;
                }
              }
            } else {
              if (err.message.startsWith('ER_DATA_TOO_LONG:')) {
                $$('add_root_form').elements.root.define('invalidMessage', 'Too long');
                $$('add_root_form').markInvalid('root', true);
              } else {
                UI.error(err);
              }
            }
          });
        }
      },
      elements: [
        { view: 'text', id: 'NAME_LABEL', label: STRINGS.NAME, required: true, name: 'root', labelWidth: UIHelper.LABEL_WIDTH },
        UIControls.getEntityTypeSelectTemplate(),
        UIControls.getSubmitCancelForFormWindow('add_root')
      ]
    }
};

UILayout.windows.addEntity = {
    view: 'window',
    id: 'add_entity_window',
    width: 350,
    position: 'center',
    modal: true,
    head: STRINGS.ADD_ENTITY,
    on: UIControls.getOnForFormWindow('add_entity'),
    body: {
      view: 'form',
      id: 'add_entity_form',
      borderless: true,
      on: {
        onSubmit: function() {
          if ($$('add_entity_form').validate()) {
            var formData = $$('add_entity_form').getValues();
            var newEntityId = Identity.childId(UI.entityList.getRootId(), formData.name);
            var data = Identity.dataFromId(newEntityId);
            data.fields = [];
            data.othersCan = formData.othersCan;
            Mydataspace.request('entities.create', data, function() {
              $$('add_entity_window').hide();
              UIControls.removeSpinnerFromWindow('add_entity_window');
            }, function(err) {
              UIControls.removeSpinnerFromWindow('add_entity_window');
              for (let i in err.errors) {
                let e = err.errors[i];
                switch (e.type) {
                  case 'unique violation':
                    if (e.path === 'entities_root_path') {
                      $$('add_entity_form').elements.name.define('invalidMessage', 'Name already exists');
                      $$('add_entity_form').markInvalid('name', true);
                    }
                    break;
                }
              }
            });
          }
        }
      },
      elements: [
        { view: 'text', required: true, id: 'NAME_LABEL_1', label: STRINGS.NAME, name: 'name', labelWidth: UIHelper.LABEL_WIDTH },
        UIControls.getEntityTypeSelectTemplate(),
        UIControls.getSubmitCancelForFormWindow('add_entity')
      ]
    }
};

UILayout.windows.addField = {
  view: 'window',
  id: 'add_field_window',
  width: 300,
  position: 'center',
  modal: true,
  head: STRINGS.ADD_FIELD,
  on: UIControls.getOnForFormWindow('add_field'),
  body: {
    view: 'form',
    id: 'add_field_form',
    borderless: true,
    on: {
      onSubmit: function() {
        if (!$$('add_field_form').validate()) {
          return;
        }
        UI.entityForm.addField($$('add_field_form').getValues(), true);
        setTimeout(function() {
          $$('add_field_window').hide();
        }, 100);
      }
    },
    elements: [
      { view: 'text', required: true, id: 'NAME_LABEL_2', label: STRINGS.NAME, name: 'name' },
      UIControls.getFieldTypeSelectTemplate(),
      { view: 'text', id: 'VALUE_LABEL', label: STRINGS.VALUE, name: 'value' },
      UIControls.getSubmitCancelForFormWindow('add_field', false)
    ],
    rules: {
      name: function(value) { return typeof $$('entity_form__' + value) === 'undefined' },
      value: function(value) {
        var values = $$('add_field_form').getValues();
        var typeInfo = Fields.FIELD_TYPES[values.type];
        return typeof typeInfo !== 'undefined' && typeInfo.isValidValue(value);
      }
    }
  }
};

UILayout.windows.editScript = {
  view: 'window',
  id: 'edit_script_window',
  css: 'edit_script_window',
  head: false,
  left: 0,
  top: UILayout.HEADER_HEIGHT - 2,
  animate: { type: 'flip', subtype: 'vertical' },
  on: {
    onShow: function() {
      $$('edit_script_window').$view.classList.add('animated');
      $$('edit_script_window').$view.classList.add('fadeInUp');

      $$('CLOSE_LABEL').define('hotkey', 'escape');
      var windowWidth =
        $$('admin_panel').$width -
        $$('my_data_panel__right_panel').$width -
        $$('my_data_panel__resizer_2').$width - 2;

      var windowHeight = $$('my_data_panel').$height - 2;

      $$('edit_script_window').define('width', windowWidth);
      $$('edit_script_window').define('height', windowHeight);
      $$('edit_script_window').resize();
      $$('my_data_panel__resizer_2').disable();
    },

    onBlur: function() {
      if (UI.entityForm.editScriptFieldId == null) {
        return;
      }
      $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
    },

    onHide: function() {
      $$('edit_script_window').$view.classList.remove('animated');
      $$('edit_script_window').$view.classList.remove('fadeInUp');
      // $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
      $$('my_data_panel__resizer_2').enable();
    },
  },
  body: {
    rows: [
      { view: 'toolbar',
        id: 'edit_script_window__toolbar',
        elements: [
          { view: 'button',
            type: 'icon',
            icon: 'align-justify',
            width: 70,
            label: 'Text',
            id: 'edit_script_window__toolbar_text_button',
            click: function() {
              $$('edit_script_window__toolbar_text_button').getNode().classList.add('webix_el_button--active');
              $$('edit_script_window__toolbar_md_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_html_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_js_button').getNode().classList.remove('webix_el_button--active');
              const editor = $$('edit_script_window__editor').getEditor();
              editor.getSession().setMode('ace/mode/text');
            }
          },
          { view: 'button',
            type: 'icon',
            icon: 'bookmark',
            width: 110,
            label: 'Markdown',
            id: 'edit_script_window__toolbar_md_button',
            click: function() {
              $$('edit_script_window__toolbar_text_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_md_button').getNode().classList.add('webix_el_button--active');
              $$('edit_script_window__toolbar_html_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_js_button').getNode().classList.remove('webix_el_button--active');
              const editor = $$('edit_script_window__editor').getEditor();
              editor.getSession().setMode('ace/mode/markdown');
            }
          },
          { view: 'button',
            type: 'icon',
            icon: 'code',
            width: 80,
            label: 'HTML',
            id: 'edit_script_window__toolbar_html_button',
            click: function() {
              $$('edit_script_window__toolbar_text_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_md_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_html_button').getNode().classList.add('webix_el_button--active');
              $$('edit_script_window__toolbar_js_button').getNode().classList.remove('webix_el_button--active');
              const editor = $$('edit_script_window__editor').getEditor();
              editor.getSession().setMode('ace/mode/html');
              editor.getValue();
            }
          },
          { view: 'button',
            type: 'icon',
            icon: 'cog',
            width: 110,
            label: 'JavaScript',
            css:   'webix_el_button--active',
            id: 'edit_script_window__toolbar_js_button',
            click: function() {
              $$('edit_script_window__toolbar_text_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_md_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_html_button').getNode().classList.remove('webix_el_button--active');
              $$('edit_script_window__toolbar_js_button').getNode().classList.add('webix_el_button--active');
              const editor = $$('edit_script_window__editor').getEditor();
              editor.getSession().setMode('ace/mode/javascript');
              editor.getValue();
            }
          },
          {},
          { view: 'button',
            type: 'icon',
            icon: 'times',
            id: 'CLOSE_LABEL', label: STRINGS.CLOSE,
            width: 70,
            click: function() {
              $$('edit_script_window').hide();
            }
          }
        ]
      },
      { view: 'ace-editor',
        id: 'edit_script_window__editor',
        mode: 'javascript',
        show_hidden: true,
        on: {
          onReady: function(editor) {
            editor.getSession().setTabSize(2);
            editor.getSession().setUseSoftTabs(true);
            editor.setReadOnly(true);
            editor.getSession().setUseWorker(false);
            editor.commands.addCommand({
              name: 'save',
              bindKey: { win: 'Ctrl-S' },
              exec: function(editor) {
                if (UI.entityForm.editScriptFieldId) {
                  $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
                }
                UI.entityForm.save();
              }
            });
            editor.on('change', function() {
              if (UI.entityForm.editScriptFieldId) {
                $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
              }
            });
          }
        }
      }
    ]
  }
};

UILayout.sideMenu =
  {
    view: 'sidemenu',
    id: 'menu',
    width: 200,
    position: 'right',
    state: function(state) {
      state.top = UILayout.HEADER_HEIGHT - 2;
      state.height -= UILayout.HEADER_HEIGHT - 2;
    },
    body: {
      rows: [
        { view: 'template',
          borderless: true,
          id: 'profile',
          css: 'profile',
          template: '<div class="profile__img_wrap"><img class="profile__img" src="#avatar#" /></div><div class="profile__name">#name#</div>',
          data: {
            avatar: '/images/no_avatar.png',
            name: 'No name'
          }
        },
        { view: 'list',
          id: 'menu__item_list',
          borderless: true,
          scroll: false,
          css: 'menu__item_list',
          template: '<span class="webix_icon fa-#icon#"></span> #value#',
          data:[
            { id: 'data', value: STRINGS.MY_DATA, icon: 'database' },
            { id: 'apps', value: STRINGS.MY_APPS, icon: 'cogs' },
            { id: 'logout', value: STRINGS.SIGN_OUT, icon: 'sign-out' }
          ],
          select: true,
          type: { height: 40 },
          on: {
            onSelectChange: function () {
              switch (this.getSelectedId()) {
                case 'data':
                  UI.pages.setCurrentPage('data');
                  break;
                case 'apps':
                  UI.pages.setCurrentPage('apps');
                  break;
                case 'logout':
                  Mydataspace.logout();
                  break;
                default:
                  throw new Error('Illegal menu item id');
              }
            }
          }
        }
      ]
    }
  };

UILayout.header =
  { css: 'admin_panel__header',
    cols: [
      { type: 'header' },
      { view: 'button',
        width: 90,
        css: 'menu__language_button menu__language_button--get_started',
        id: 'GET_STARTED_LABEL',
        label: STRINGS.GET_STARTED,
        click: function() {
          location.href = 'get-started';
        }
      },
      { view: 'button',
        width: 70,
        css: 'menu__language_button',
        id: 'DEMOS_LABEL',
        label: STRINGS.DEMOS,
        click: function() {
          location.href = 'demos';
        }
      },
      { view: 'button',
        width: 110,
        css: 'menu__language_button',
        id: 'DOCS_LABEL',
        label: STRINGS.DOCS,
        click: function() {
          location.href = 'docs';
        }
      },
      { width: 10, css: 'menu__spacer' },
      { view: 'button',
        width: 30,
        id: 'menu__language_button_en',
        css: 'menu__language_button ' + (LANGUAGE === 'EN' ? 'menu__language_button--selected' : ''),
        label: 'EN',
        click: function() {
          localStorage.setItem('language', 'EN');
          UI.updateLanguage();
        }
      },
      { view: 'button',
        width: 30,
        id: 'menu__language_button_ru',
        css: 'menu__language_button ' + (LANGUAGE === 'RU' ? 'menu__language_button--selected' : ''),
        label: 'RU',
        click: function() {
          localStorage.setItem('language', 'RU');
          UI.updateLanguage();
        }
      },
      { width: 10, css: 'menu__spacer' },
      { view: 'button',
        width: 90,
        id: 'SIGN_IN_LABEL',
        css: 'menu__login_button',
        label: STRINGS.SIGN_IN,
        hidden: UIHelper.isValidJWT(localStorage.getItem('authToken')),
        click: function() {
          $('#signin_modal').modal('show');
        }
      },
      { view: 'icon',
        icon: 'bars',
        hidden: !UIHelper.isValidJWT(localStorage.getItem('authToken')),
        id: 'menu_button',
        css: 'menu_button',
        click: function() {
          if($$('menu').config.hidden) {
            $$('menu').show();
          }
          else
            $$('menu').hide();
        }
      }
    ],
    height: UILayout.HEADER_HEIGHT
  };

UILayout.entityTree =
{ id: 'my_data_panel__left_panel',
  gravity: 0.5,
  rows: [
    { view: 'toolbar',
      elements: [
        { view: 'button',
          type: 'icon',
          icon: 'plus',
          id: 'ADD_ROOT_LABEL', label: STRINGS.ADD_ROOT,
          width: 110,
          click: function() {
            $$('add_root_window').show();
          }
        },
        { view: 'button',
          width: 35,
          type: 'iconButton',
          icon: 'user',
          css: 'entity_tree__search_button',
          popup: 'entity_tree__root_scope_popup',
          // options: Fields.getFieldTypesAsArrayOfIdValue(),
          id: 'entity_tree__root_scope',
          on: {
            onItemClick: function() {
              // this.currentFieldName = data.name;
              // $$('entity_form__field_type_popup_list').select(data.type);
            }.bind(this)
          }
        },
        { view: 'search',
          id: 'entity_tree__search',
          css: 'entity_tree__search',
          align: 'center',
          icon: 'close',
          placeholder: STRINGS.SEARCH_BY_ROOTS,
          on: {
            onAfterRender: function() {

            },
            onKeyPress: function(code, e) {
              if (code === 13) {
                var search = $$('entity_tree__search').getValue();

                switch ($$('entity_tree__root_scope')._settings['icon']) {
                  case 'user':
                    if (MDSCommon.isBlank(search)) {
                      search = 'me:*';
                    } else {
                      search = 'me:*' + search + '*';
                    }
                    break;
                  case 'globe':
                    if (MDSCommon.isBlank(search)) {
                      search = '*';
                    } else {
                      search = '*' + search + '*';
                    }
                    break;
                  case 'edit':
                    break;
                }

                window.location.href = '/#' + search;
                UI.pages.refreshPage('data');
                return false;
              }
            }
          }
        }
      ]
    },
    { view: 'tree',
      id: 'entity_tree',
      gravity: 0.4,
      select: true,
      template:function(obj, common) {
        var path = Identity.dataFromId(obj.id).path;
        if (path === '') { // root
          var ava = MDSCommon.findValueByName(obj.associatedData.fields, 'avatar');
          var name = MDSCommon.findValueByName(obj.associatedData.fields, 'name') || obj.value;
          var description =
            MDSCommon.findValueByName(obj.associatedData.fields, 'description');
          var avatarURL = MDSCommon.isBlank(ava) ? '/images/icons/root.svg' :  Mydataspace.options.apiURL + '/avatars/sm/' + ava + '.png';
          var folder =
            '<div class="webix_tree_folder_open entity_tree__root_icon_wrap">' +
              '<img class="entity_tree__root_icon" src="' + avatarURL + '" />' +
            '</div>';

          var rootNameClass = 'entity_tree__root_name';
          if (MDSCommon.isBlank(description)) {
            rootNameClass += ' entity_tree__root_name--without-description';
          }
          return common.icon(obj, common) +
                 folder +
                 '<div class="entity_tree__root_wrap">' +
                   '<span class="entity_tree__root">' +
                     '<div class="' + rootNameClass + '">' + name + '</div>' +
                     (MDSCommon.isBlank(description) ? '' : '<div class="entity_tree__root_description">' + description + '</div>') +
                   '</span>' +
                 '</div>';
        }

        var icon = UIHelper.getIconByPath(path,
                                          obj.$count === 0,
                                          obj.open);
        return common.icon(obj, common) +
               '<div class="webix_tree_folder_open fa fa-' + icon + '"></div>' +
               '<span>' + obj.value + '</span>';
      },
      on: {
        onAfterLoad: function() {
          if (!UI.entityTree.getCurrentId()) {
            UI.entityTree.setCurrentIdToFirst();
          }
          $$('entity_tree').select(UI.entityTree.getCurrentId());
          $$('entity_tree').open(UI.entityTree.getCurrentId());
        },
        onBeforeOpen: function(id) {
          UI.entityTree.resolveChildren(id);
        },
        onSelectChange: function(ids) {
          var id = ids[0];
          if (id.endsWith(UIHelper.ENTITY_TREE_SHOW_MORE_ID)) {
            $$('entity_tree').select(UI.entityTree.getCurrentId());
          } else {
            UI.entityTree.setCurrentId(id);
            UI.entityList.setRootId(id);
            UI.entityForm.setSelectedId(id);
          }
        },
        onBeforeSelect: function(id, selection) {
          if (id.endsWith(UIHelper.ENTITY_TREE_SHOW_MORE_ID)) {
            UI.entityTree.showMore(Identity.parentId(id));
          }
        }
      }
    }
  ]
};

UILayout.entityList =
{ id: 'my_data_panel__central_panel',
  gravity: 0.8,
  rows: [
    { view: 'toolbar',
      cols: [
        { view: 'button',
          type: 'icon',
          icon: 'plus',
          id: 'ADD_ENTITY_LABEL', label: STRINGS.ADD_ENTITY,
          width: 110,
          click: function() {
            $$('add_entity_window').show();
          }
        },
        { view: 'button',
          type: 'icon',
          icon: 'refresh',
          id: 'REFRESH_LABEL', label: STRINGS.REFRESH,
          width: 100,
          click: function() {
            UI.entityList.refreshData();
          }
        },
        { id: 'entity_list__menu_sep'
        },
        { view: 'search',
          id: 'entity_list__search',
          css: 'entity_list__search',
          align: 'center',
          hidden: true,
          icon: 'close',
          placeholder: STRINGS.SEARCH_BY_ENTITIES,
          on: {
            onKeyPress: function(code, e) {
              if (code === 13 && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                UI.entityList.refreshData();
                return false;
              }
            },
            onSearchIconClick: function() {
              $$('entity_list__search').setValue('');
              $$('entity_list__search').hide();
              $$('entity_list__menu_sep').show();
              $$('ENTITY_SEARCH_LABEL').show();
              UI.entityList.refreshData();
            }
          }
        },
        { view: 'button',
          type: 'icon',
          icon: 'search',
          id: 'ENTITY_SEARCH_LABEL',
          width: 30,
          click: function() {
            $$('entity_list__search').show();
            $$('entity_list__menu_sep').hide();
            $$('ENTITY_SEARCH_LABEL').hide();
          }
        }
      ]
    },
    { view: 'list',
      id: 'entity_list',
      select: true,
      template: function(obj) {
        var icon =
          UIHelper.getIconByPath(Identity.dataFromId(obj.id).path,
                                 obj.count === 0,
                                 false);
        return (obj.id.endsWith(UIHelper.ENTITY_LIST_SHOW_MORE_ID) ? '' :
                  '<div class="entity_list__item_icon fa fa-' + icon + '"></div>') +
               '<div class="entity_list__item">' +
               '<div class="entity_list__item_name">' + obj.value + '</div>' +
               (obj.count == null ? '' :
                 '<div class="entity_list__item_count">' + obj.count + '</div>' +
                 '<div class="entity_list__item_count_prefix fa fa-child"></div>') +
               '</div>';
      },
      on: {
        onBeforeSelect: function(id, selection) {
          if (id.endsWith(UIHelper.ENTITY_LIST_SHOW_MORE_ID)) {
            UI.entityList.showMore();
          } else {
            UI.entityList.setCurrentId(id);
          }
        },
        onSelectChange: function (ids) {
          var id = ids[0];
          if (id.endsWith(UIHelper.ENTITY_LIST_SHOW_MORE_ID)) {
            $$('entity_list').select(UI.entityList.getCurrentId());
          } else {
            UI.entityForm.setSelectedId(id);
          }
        },
        onItemDblClick: function(id) {
          var parentId = Identity.parentId(id);
          if (id === 'root' || parentId === 'root') {
            return;
          }
          UI.entityTree.resolveChildren(parentId).then(function() {
            $$('entity_tree').open(parentId);
            $$('entity_tree').select(id);
          });
        }
      }
    }
  ]
};

UILayout.entityForm =
{ id: 'my_data_panel__right_panel',
  rows: [
  { view: 'toolbar',
    id: 'entity_form__toolbar',
    cols: [
      { view: 'button',
        type: 'icon',
        icon: 'refresh',
        id: 'REFRESH_ENTITY_LABEL', label: STRINGS.REFRESH_ENTITY,
        width: 80,
        click: function() {
          UI.entityForm.refresh();
        }
      },
      { view: 'button',
        type: 'icon',
        icon: 'save',
        id: 'SAVE_ENTITY_LABEL',
        label: STRINGS.SAVE_ENTITY,
        hidden: true,
        width: 65,
        click: function() {
          UI.entityForm.save();
        }
      },
      { view: 'button',
        type: 'icon',
        icon: 'plus',
        id: 'ADD_FIELD_LABEL', label: STRINGS.ADD_FIELD,
        hidden: true,
        width: 100,
        click: function() {
          $$('add_field_window').show();
        }
      },
      { view: 'button',
        type: 'icon',
        icon: 'play',
        id: 'RUN_SCRIPT_LABEL', label: STRINGS.RUN_SCRIPT,
        hidden: true,
        width: 60,
        hidden: true,
        click: function() {
          UIHelper.popupCenter('/run-script.html', 'Run Script', 600, 400);
        }
      },
      {},
      { view: 'button',
        type: 'icon',
        icon: 'remove',
        id: 'DELETE_ENTITY_SHORT_LABEL', label: STRINGS.DELETE_ENTITY_SHORT,
        width: 80,
        click: function() {
          webix.confirm({
            title: STRINGS.DELETE_ENTITY,
            text: STRINGS.REALLY_DELETE,
            ok: STRINGS.YES,
            cancel: STRINGS.NO,
            callback: function(result) {
              if (result) {
                UI.entityForm.delete();
              }
            }
          });
        }
      },
      { view: 'button',
        type: 'icon',
        icon: 'pencil-square-o',
        id: 'EDIT_ENTITY_LABEL',
        label: STRINGS.EDIT_ENTITY,
        width: 60,
        click: function() {
          UI.entityForm.setEditing(true);
          UI.entityForm.refresh();
        }
      },
      { view: 'button',
        type: 'icon',
        icon: 'eye',
        id: 'CANCEL_ENTITY_LABEL', label: STRINGS.CANCEL_ENTITY,
        width: 60,
        hidden: true,
        click: function() {
          UI.entityForm.setEditing(false);
          UI.entityForm.refresh();
        }
      }
    ]
  },
  {
    id: 'entity_view',
    template: '<div id="view" class="view"><div class="view__loading"></div></div>',
    scroll: true,
    css: 'entity_view'
  },
  { view: 'form',
    id: 'entity_form',
    css: 'entity_form',
    complexData: true,
    scroll: true,
    hidden: true,
    elements: [
      { view: 'text',
        id: 'NAME_LABEL_5',
        label: STRINGS.NAME,
        name: 'name',
        labelWidth: UIHelper.LABEL_WIDTH
      },
      UIControls.getEntityTypeSelectTemplate(),
      { view: 'text',
        id: 'CHILD_PROTO_LABEL',
        label: STRINGS.CHILD_PROTO,
        name: 'childPrototype',
        labelWidth: UIHelper.LABEL_WIDTH
      },
      { view: 'text',
        id: 'MAX_NUMBER_OF_CHILDREN_LABEL',
        label: STRINGS.MAX_NUMBER_OF_CHILDREN,
        name: 'maxNumberOfChildren',
        labelWidth: UIHelper.LABEL_WIDTH
      },
      { view: 'checkbox',
        id: 'PROTO_IS_FIXED_LABEL',
        label: STRINGS.PROTO_IS_FIXED,
        name: 'isFixed',
        labelWidth: UIHelper.LABEL_WIDTH
      },
      { id: 'entity_form__fields_title',
        template: STRINGS.FIELDS,
        type: 'section'
      },
      { view: 'label',
        id: 'NO_FIELDS_LABEL',
        label: STRINGS.NO_FIELDS,
        align: 'center'
      }
    ],
    on: {
      onChange: function() { UI.entityForm.updateToolbar() }
    }
  }
]};

//
// My Apps Page
//
UILayout.apps =
{ id: 'my_apps_panel',
  height: window.innerHeight - UILayout.HEADER_HEIGHT,
  hidden: true,
  cols: [
    // List of apps
    { rows: [
        { view: 'toolbar',
          elements: [
            { view: 'button',
              type: 'icon',
              icon: 'plus',
              id: 'NEW_APP_LABEL', label: STRINGS.NEW_APP,
              width: 120,
              click: function() {
                $$('add_app_window').show();
              }
            },
            { view: 'button',
              type: 'icon',
              icon: 'refresh',
              id: 'REFRESH_LABEL_1', label: STRINGS.REFRESH,
              width: 100,
              click: function() {
                UI.pages.refreshPage('apps');
              }
            },
            {}
          ]
        },
        { view: 'list',
          id: 'app_list',
          select: true,
          template: '<div>#value#</div>',
          on: {
            onSelectChange: function (ids) {
              $$('app_form').disable();
              Mydataspace.request(
                'apps.get',
                { clientId: ids[0] }, function() {
                  $$('app_form').enable();
                }, function(err) {
                  $$('app_form').enable();
                  UI.error(err);
                });
            }
          }
        }
      ]
    },
    {
      view: 'resizer',
      id: 'my_apps_panel__resizer',
      disabled: true
    },
    // Selected app edit
    { id: 'my_apps_panel__right_panel',
      rows: [
      { view: 'toolbar',
        cols: [
          { view: 'button',
            type: 'icon',
            icon: 'save',
            id: 'SAVE_APP_LABEL', label: STRINGS.SAVE_APP,
            width: 80,
            click: function() {
              UI.appForm_save();
            }
          },
          { view: 'button',
            type: 'icon',
            icon: 'refresh',
            id: 'REFRESH_APP_LABEL', label: STRINGS.REFRESH_APP,
            width: 100,
            click: function() {
              $$('app_form').disable();
              Mydataspace.request(
                'apps.get',
                { clientId: $$('app_list').getSelectedId() }, function() {
                  $$('app_form').enable();
                }, function(err) {
                  $$('app_form').enable();
                  UI.error(err);
                });
            }
          },
          {},
          { view: 'button',
            type: 'icon',
            icon: 'remove',
            id: 'DELETE_LABEL', label: STRINGS.DELETE,
            width: 80,
            click: function() {
              webix.confirm({
                title: STRINGS.DELETE_APP,
                text: STRINGS.REALLY_DELETE_APP,
                ok: STRINGS.YES,
                cancel: STRINGS.NO  ,
                callback: function(result) {
                  if (result) {
                    $$('app_form').disable();
                    Mydataspace.request(
                      'apps.delete',
                      { clientId: $$('app_list').getSelectedId() });
                  }
                }
              });
            }
          }
        ]
      },
      { view: 'form',
        id: 'app_form',
        complexData: true,
        scroll: true,
        elements: [
          { view: 'text', id: 'NAME_LABEL_4', label: STRINGS.NAME, name: 'name', labelWidth: UIHelper.LABEL_WIDTH },
          { view: 'textarea', id: 'DESCRIPTION_LABEL', label: STRINGS.DESCRIPTION, height: 100, name: 'description', labelWidth: UIHelper.LABEL_WIDTH },
          { view: 'text', id: 'LOGO_URL_LABEL', label: STRINGS.LOGO_URL, name: 'logoURL', labelWidth: UIHelper.LABEL_WIDTH },
          { view: 'text', id: 'SITE_URL_LABEL_1', label: STRINGS.SITE_URL, name: 'url', labelWidth: UIHelper.LABEL_WIDTH },
          { view: 'text', id: 'CLIENT_ID_LABEL', label: STRINGS.CLIENT_ID, name: 'clientId', readonly:true, labelWidth: UIHelper.LABEL_WIDTH }
        ],
        on: {
          onChange: function() { UI.appForm_updateToolbar() }
        }
      }
    ]}
  ]
};

UI = {

  entityForm: new EntityForm(),

  entityList: new EntityList(),

  entityTree: new EntityTree(),

  pages: new Pages(),

  VISIBLE_ON_SMALL_SCREENS: [
    'SIGN_OUT_LABEL'
  ],

  updateLanguage: function() {

    var currentLang = localStorage.getItem('language') || 'EN';
    var strings = STRINGS_ON_DIFFERENT_LANGUAGES[currentLang];

    // Language swithcer

    for (var lang in STRINGS_ON_DIFFERENT_LANGUAGES) {
      var langButton = $$('menu__language_button_' + lang.toLowerCase());
      if (lang === currentLang) {
        webix.html.addCss(langButton.getNode(), 'menu__language_button--selected');
      } else {
        webix.html.removeCss(langButton.getNode(), 'menu__language_button--selected');
      }
    }

    // Labels

    for (var key in strings) {
      var label = $$(key + '_LABEL');
      if (label == null) {
        continue;
      }

      var i = 1;
      while (label != null) {
        label.define('label', strings[key]);
        label.refresh();
        label = $$(key + '_LABEL_' + i);
        i++;
      }
    }

    // Menu

    var menuItemList = $$('menu__item_list');
    var menuItemListSelectedId = menuItemList.getSelectedId();
    var data = [
      { id: 'data', value: strings.MY_DATA, icon: 'database' },
      { id: 'apps', value: strings.MY_APPS, icon: 'cogs' },
      { id: 'logout', value: strings.SIGN_OUT, icon: 'sign-out' }
    ];
    menuItemList.clearAll();
    for (var i in data) {
      menuItemList.add(data[i]);
    }
    menuItemList.select(menuItemListSelectedId);


    // Dialogs
    var dialogs = ['ADD_ROOT', 'ADD_ENTITY', 'ADD_FIELD'];
    for (var i in dialogs) {
      var dialogId = dialogs[i];
      var dialog = $$(dialogId.toLowerCase() + '_window');
      dialog.getHead().define('template', strings[dialogId]);
      dialog.getHead().refresh();
      $$(dialogId.toLowerCase() + '_window__create_button').setValue(strings.CREATE);
      $$(dialogId.toLowerCase() + '_window__cancel_button').setValue(strings.CANCEL);
    }

    // Comboboxes

    // Others

    $$('entity_form__fields_title').define('template', strings.FIELDS);
    $$('entity_form__fields_title').refresh();

    $$('entity_list__search').define('placeholder', strings.SEARCH);
    $$('entity_list__search').refresh();
  },

  /**
   * Notify user about error.
   * @param err Object in format:
   *            { name: 'Exception name', message: 'Error message' }
   *            Error object can also contains next fields:
   *            - errors - array of errors if several errors happens.
   */
  error: function(err) {
    switch (err.name) {
      case 'NotAuthorizedErr':
        break;
      default:
        webix.message({ type: 'error', text: err.message || err.name });
        break;
    }
  },

  refresh: function() {
    Mydataspace.emit('users.getMyProfile', {});
    UI.pages.refreshPage('apps', true);
    UI.pages.refreshPage('data', true);
  },

  //
  // Apps
  //
  refreshApps: function() {
    $$('app_list').disable();
    Mydataspace.request('apps.getAll', {}, function() {
      $$('app_list').enable();
    }, function(err) {
      $$('app_list').enable();
      UI.error(err);
    });
  },

  appForm_save: function() {
    $$('app_form').disable();
    Mydataspace.request('apps.change', $$('app_form').getValues(), function() {
      $$('app_form').enable();
    }, function(err) {
      $$('app_form').enable();
      UI.error(err);
    });
  },

  appForm_updateToolbar: function() {
    if (!$$('app_form').isDirty()) {
      $$('SAVE_APP_LABEL').disable();
    } else {
      $$('SAVE_APP_LABEL').enable();
    }
  },

  appForm_setClean: function() {
    $$('app_form').setDirty(false);
    UI.appForm_updateToolbar();
    $$('app_form').enable();
  },

  appForm_setData: function(data) {
    $$('app_form').setValues(data);
    UI.appForm_setClean();
  },

  initConnection: function() {
    Mydataspace.on('login', function() {
      document.getElementById('bootstrap').style.display = 'none';
      document.getElementById('webix').style.display = 'block';
      UI.updateSizes();
      UI.refresh();
      $$('SIGN_IN_LABEL').hide();
      $$('menu_button').show();
      $('#signin_modal').modal('hide');
    });

    Mydataspace.on('logout', function() {
      $$('menu').hide();
      if (!UIHelper.isViewOnly()) {
        document.getElementById('bootstrap').style.display = 'block';
        document.getElementById('webix').style.display = 'none';
      }
      document.getElementById('no_items').style.display = 'none';
      $$('SIGN_IN_LABEL').show();
      $$('menu_button').hide();
    });

    UI.entityForm.listen();
    UI.entityList.listen();
    UI.entityTree.listen();

    Mydataspace.on('users.getMyProfile.res', function(data) {
      if (MDSCommon.isBlank(data['avatar'])) {
        data['avatar'] = '/images/no_avatar.png';
      }
      $$('profile').setValues(data);
    });

    Mydataspace.on('entities.create.res', function() {
      setTimeout(function() {
        UI.pages.updatePageState('data');
      }, 10);
    });

    Mydataspace.on('entities.delete.res', function() {
      setTimeout(function() {
        UI.pages.updatePageState('data');
      }, 10);
    });

    Mydataspace.on('entities.getMyRoots.res', function() {
      setTimeout(function() {
        UI.pages.updatePageState('data');
      }, 10);
    });

    Mydataspace.on('apps.create.res', function(data) {
      $$('add_app_window').hide();
      $$('app_list').add({
        id: data.clientId,
        value: data.name
      });
      UI.pages.updatePageState('apps');
      $$('app_list').select(data.clientId);
    });

    Mydataspace.on('apps.change.res', function(data) {
      $$('app_form').setValues(data);
      $$('app_form').setDirty(false);
      UI.appForm_setData(data);
    });

    Mydataspace.on('apps.delete.res', function(data) {
      var nextId = $$('app_list').getPrevId(data.clientId) || $$('app_list').getNextId(data.clientId);
      if (nextId != null) {
        $$('app_list').select(nextId);
      }
      $$('app_list').remove(data.clientId);
      UI.pages.updatePageState('apps');
    });

    Mydataspace.on('apps.get.res', function(data) {
      UI.appForm_setData(data);
    });

    Mydataspace.on('apps.getAll.res', function(data) {
      var items = data.map(function(x) {
        return {
          id: x.clientId,
          value: x.name
        };
      });
      $$('app_list').clearAll();
      for (var i in items) {
        $$('app_list').add(items[i], -1);
      }
      var firstId = $$('app_list').getFirstId();
      if (firstId !== null) {
        $$('app_list').select(firstId);
      }
      $$('app_list').enable();
      UI.pages.updatePageState('apps');
    });

    Mydataspace.on('apps.err', UI.error);
    Mydataspace.on('entities.err', UI.error);
  },

  /**
   * Initialize UI only once!
   */
  rendered: false,

  render: function() {
    if (UI.rendered) {
      return;
    }
    UI.rendered = true;

    //
    // Communication with popup window of script runner.
    //
    window.addEventListener('message', function(e) {
      if (e.data.message === 'getScripts') {
        var fields = Fields.expandFields($$('entity_form').getValues().fields);
        if (typeof fields === 'undefined') {
          fields = {};
        }
        var values = Object.keys(fields).map(function(key) { return fields[key]; });
        values.sort(function(a, b) {
          if (a.type === 'j' && b.type !== 'j') {
            return 1;
          } else if (a.type !== 'j' && b.type === 'j') {
            return -1;
          } else if (a.type === 'j' && b.type === 'j') {
            if (a.name === 'main.js') {
              return 1;
            } else if (b.name === 'main.js') {
              return -1;
            }
            return 0;
          }
          return 0;
        });
        e.source.postMessage({ message: 'fields', fields: values }, '*');
      }
    });

    webix.ui({
    	view: 'popup',
    	id: 'entity_form__field_type_popup',
        css: 'entity_form__field_type_popup',
    	width: 130,
    	body:{
    		view: 'list',
            id: 'entity_form__field_type_popup_list',
            class: 'entity_form__field_type_popup_list',
            borderless: true,
    		data:[
              { id: 's', value: 'String', icon: 'commenting' },
              { id: 'j', value: 'Text', icon: 'align-justify' },
              { id: 'i', value: 'Integer', icon: 'italic' },
              { id: 'r', value: 'Float', icon: 'calculator'  },
              { id: 'u', value: 'URL', icon: 'link' },
              { id: 'w', value: 'Secret', icon: 'lock' },

              // { id: 'b', value: 'Boolean', icon: 'check-square-o' },
              // { id: 'd', value: 'Date', icon: 'calendar-o' },
              // { id: 'm', value: 'Money', icon: 'dollar' },
              // { id: 'e', value: 'Email', icon: 'envelope' },
              // { id: 'p', value: 'Phone', icon: 'phone' },

              // { id: 'c', value: 'Custom', icon: 'pencil' },
              // { value: 'More...', icon: '' },
    		],
    		datatype: 'json',
    		template: '<i class="fa fa-#icon#" style="width: 28px;"></i> #value#',
    		autoheight: true,
    		select: true,
            on: {
              onItemClick: function(newv) {
                var fieldName = UI.entityForm.currentFieldName;
                var fieldId = 'entity_form__' + fieldName;
                var fieldValue = $$(fieldId + '_value').getValue();
                $$(fieldId + '_type_button').define('icon', Fields.FIELD_TYPE_ICONS[newv]);
                $$(fieldId + '_type_button').refresh();
                var oldv = $$(fieldId + '_type').getValue();
                $$(fieldId + '_type').setValue(newv);
                $$('entity_form__field_type_popup').hide();
                var oldValues = webix.copy($$('entity_form')._values);
                delete oldValues['fields.' + UI.entityForm.currentFieldName + '.value'];
                if (newv === 'j' || oldv === 'j') {
                  webix.ui(
                    { view: newv === 'j' ? 'textarea' : 'text',
                      label: fieldName,
                      name: 'fields.' + fieldName + '.value',
                      id: 'entity_form__' + fieldName + '_value',
                      value: fieldValue,
                      labelWidth: UIHelper.LABEL_WIDTH,
                      height: 32,
                      css: 'entity_form__text_label',
                      on: {
                        onFocus: function() {
                          if (newv === 'j') {
                            this.editScriptFieldId = 'entity_form__' + fieldName + '_value';
                            $$('edit_script_window').show();
                          }
                        }
                      }
                    },
                    $$('entity_form__' + fieldName),
                    $$('entity_form__' + fieldName + '_value')
                  );
                  if (newv === 'j') {
                    $$('entity_form__' + UI.entityForm.currentFieldName + '_indexed_button').disable();
                    var fieldIndexed = $$(fieldId + '_indexed').getValue();
                    $$('entity_form__' + UI.entityForm.currentFieldName + '_indexed_button').define('icon', Fields.FIELD_INDEXED_ICONS['fulltext']);
                    $$('entity_form__' + UI.entityForm.currentFieldName + '_indexed_button').refresh();
                  } else {
                    $$('entity_form__' + UI.entityForm.currentFieldName + '_indexed_button').enable();
                    $$('entity_form__' + UI.entityForm.currentFieldName + '_indexed_button').define('icon', Fields.FIELD_INDEXED_ICONS[fieldIndexed || 'off']);
                    $$('entity_form__' + UI.entityForm.currentFieldName + '_indexed_button').refresh();
                  }
                }
                $$('entity_form')._values = oldValues;
              }
            }
    	}
    });


    webix.ui({
    	view: 'popup',
    	id: 'entity_tree__root_scope_popup',
        css: 'entity_tree__root_scope_popup',
    	width: 130,
    	body:{
    		view: 'list',
            id: 'entity_tree__root_scope_popup_list',
            class: 'entity_tree__root_scope_popup_list',
            borderless: true,
    		data:[
              { id: 'user', value: 'Yours', icon: 'user' },
              { id: 'globe', value: 'All', icon: 'globe' },
              { id: 'edit', value: 'Custom', icon: 'edit' },
    		],
    		datatype: 'json',
    		template: '<i class="fa fa-#icon#" style="width: 28px;"></i> #value#',
    		autoheight: true,
    		select: true,
        on: {
          onItemClick: function(newv) {
            $$('entity_tree__root_scope_popup').hide();
            $$('entity_tree__root_scope').define('icon', newv);
            $$('entity_tree__root_scope').refresh();
          }
        }
    	}
    });

    webix.ui({
    	view: 'popup',
    	id: 'entity_form__field_indexed_popup',
        css: 'entity_form__field_indexed_popup',
    	width: 180,
    	body:{
    		view: 'list',
            id: 'entity_form__field_indexed_list',
            class: 'entity_form__field_indexed_list',
            borderless: true,
    		data:[
              { id: 'on', value: 'Search &amp; Order', icon: Fields.FIELD_INDEXED_ICONS['on'] },
              { id: 'fulltext', value: 'Fulltext Search', icon: Fields.FIELD_INDEXED_ICONS['fulltext'] },
              { id: 'off', value: 'None', icon: Fields.FIELD_INDEXED_ICONS['off'] },
    		],
    		datatype: 'json',
    		template: '<i class="fa fa-#icon#" style="width: 28px;"></i> #value#',
    		autoheight: true,
    		select: true,
        on: {
          onItemClick: function(newv) {
            var fieldName = UI.entityForm.currentFieldName;
            var fieldId = 'entity_form__' + fieldName;
            $$('entity_form__field_indexed_popup').hide();
            $$('entity_form__' + fieldName + '_indexed_button').define('icon', Fields.FIELD_INDEXED_ICONS[newv]);
            $$('entity_form__' + fieldName + '_indexed_button').refresh();
            $$(fieldId + '_indexed').setValue(newv);
          }
        }
    	}
    });

    webix.ui(UILayout.windows.editScript);
    webix.ui(UILayout.windows.addRoot);
    webix.ui(UILayout.windows.addEntity);
    webix.ui(UILayout.windows.addField);
    webix.ui(UILayout.windows.addApp);
		webix.ui(UILayout.sideMenu);

    //
    // Admin panel
    //
    webix.ui({
      id: 'admin_panel',
      container: 'admin_panel',
      rows: [
        UILayout.header,
        UILayout.apps,
        //
        // My Data Page
        //
        { id: 'my_data_panel',
          height: window.innerHeight - 46,
          cols: [
            UILayout.entityTree,
            {
              id: 'my_data_panel__resizer_1',
              view: 'resizer'
            },
            UILayout.entityList,
            {
              id: 'my_data_panel__resizer_2',
              view: 'resizer'
            },
            UILayout.entityForm
          ]
        }
      ]
    });

    UI.updateSizes();

    webix.event(window, 'resize', function(e) {
      UI.updateSizes();
    });

    window.addEventListener('error', function (e) {
      UI.error(e.error.message);
      return false;
    });

    function updateTreeSearchScope() {
      if (Router.isEmpty() || Router.isMe()) {
        $$('entity_tree__root_scope').define('icon', 'user');
        $$('entity_tree__search').setValue(Router.getSearch());
      } else if (Router.isRoot()) {
        $$('entity_tree__root_scope').define('icon', 'edit');
        $$('entity_tree__search').setValue(Router.getRoot());
      } else if (Router.isSearch()) {
        $$('entity_tree__root_scope').define('icon', 'globe');
        $$('entity_tree__search').setValue(Router.getSearch());
      }
      $$('entity_tree__root_scope').refresh();
    }

    updateTreeSearchScope();

    $(window).on('hashchange', function() {
      UI.pages.refreshPage('data', true);
      updateTreeSearchScope();
    });
  },

  updateSizes: function() {
    $$('admin_panel').define({
      width: window.innerWidth,
      height: window.innerHeight
    });
    $$('my_data_panel').define({
      height: window.innerHeight - UILayout.HEADER_HEIGHT + 2
    });
    $$('my_apps_panel').define({
      height: window.innerHeight - UILayout.HEADER_HEIGHT + 2
    });
    $$('edit_script_window').define({
      height: $$('my_data_panel__resizer_2').$height
    });
    $$('admin_panel').resize();
    $$('admin_panel').resize();
    $$('edit_script_window').resize();
  }
};
