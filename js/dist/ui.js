var STRINGS_ON_DIFFERENT_LANGUAGES = {
  EN: {
    YES: 'Yes',
    NO: 'No',
    CLOSE: 'Close',
    SHOW_MORE: 'Show more...',
    EDIT_SCRIPT: 'Edit Script:',
    SAVE_ENTITY: 'Save Entity',
    RUN_SCRIPT: 'Run Script',
    ONLY_READ: 'Only Read',
    ADD_ENTITY: 'New Entity',
    SEARCH: 'Search...',
    DELETE_ENTITY: 'Delete Entity',
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
    REFRESH_APP: 'Refresh App',
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
    READ_AND_VIEW_CHILDREN: 'Read and view children'
  },
  RU: {
    YES: 'Да',
    NO: 'Нет',
    CLOSE: 'Закрыть',
    SHOW_MORE: 'Показать ещё...',
    EDIT_SCRIPT: 'Ред. скрипта:',
    SAVE_ENTITY: 'Сохранить элемент',
    RUN_SCRIPT: 'Запустить',
    ONLY_READ: 'Только читать',
    ADD_ENTITY: 'Новый эл-т',
    SEARCH: 'Поиск...',
    DELETE_ENTITY: 'Удалить эл-т',
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
    ADD_ROOT: 'Новый корень',
    ADD_FIELD: 'Новое поле',
    REFRESH: 'Обновить',
    SAVE: 'Сохранить',
    REFRESH_APP: 'Обновить прил.',
    DELETE: 'Удалить',
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
    READ_AND_VIEW_CHILDREN: 'Чтение и просм. доч. эл.'
  }
};
var LANGUAGE = localStorage.getItem('language') || 'EN';
var STRINGS = STRINGS_ON_DIFFERENT_LANGUAGES[LANGUAGE];

webix.protoUI({
	name:"ace-editor",
	defaults:{
		mode:"javascript",
		theme:"monokai"
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
			fontFamily: "consolas,monospace",
			fontSize: "12pt"
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

UIHelper = {
  /**
   * Number of entities received by single request.
   */
  NUMBER_OF_ENTITIES_LOADED_AT_TIME: 20,
  /**
   * Width of label of field in form.
   */
  LABEL_WIDTH: 120,
  NUMBER_OF_FIXED_INPUTS_IN_FIELDS_FORM: 6,
  MAX_STRING_FIELD_LENGTH: 1000,
  ENTITY_TREE_SHOW_MORE_ID: 'show_more_23478_3832ee',
  ENTITY_TREE_DUMMY_ID: 'dummy_483__4734_47e4',
  ENTITY_LIST_SHOW_MORE_ID: 'show_more_47384_3338222',
  FIELD_TYPES: {
    s: {
      title: STRINGS.STRING,
      isValidValue: function(value) {
        return value.toString().length < UIHelper.MAX_STRING_FIELD_LENGTH;
      }
    },
    r: {
      title: STRINGS.REAL,
      isValidValue: function(value) {
        return common.isNumber(value);
      }
    },
    i: {
      title: STRINGS.INT,
      isValidValue: function(value) {
        return common.isInt(value);
      }
    },
    j: {
      title: 'JS',
      isValidValue: function(value) {
        return value.toString().length < UIHelper.MAX_STRING_FIELD_LENGTH;
      }
    },
    u: {
      title: 'JS URL',
      isValidValue: function(value) {
        return value.toString().length < UIHelper.MAX_STRING_FIELD_LENGTH;
      }
    }
  },

  getFieldTypesAsArrayOfIdValue: function() {
    var ret = [];
    for (var key in UIHelper.FIELD_TYPES) {
      ret.push({
        id: key,
        value: UIHelper.FIELD_TYPES[key].title
      });
    }
    return ret;
  },

  /**
   *
   * @param dirtyFields
   * @param currentFieldNames
   * @param oldFields
   * @returns {*}
   */
  getFieldsForSave: function(dirtyFields, currentFieldNames, oldFields) {
    if (typeof dirtyFields === 'undefined') dirtyFields = {};
    var deletedFields = {};
    for (var fieldName in oldFields) {
      if (currentFieldNames.indexOf(fieldName) === -1) {
        deletedFields[fieldName] = { value: null };
      }
    }
    return common.mapToArray(common.extend(dirtyFields, deletedFields));
  },

  /**
   * Returns UI-formatted entity data from data received from server.
   */
  entityFromData: function(data) {
    var entityId = UIHelper.idFromData(data);
    var children = [];
    if (!common.isBlank(data.numberOfChildren) && data.numberOfChildren > 0) {
      children.push({
        id: UIHelper.childId(entityId, UIHelper.ENTITY_TREE_DUMMY_ID),
        value: ''
      });
    }
    return {
      id: entityId,
      value: UIHelper.nameFromData(data),
      data: children
    };
  },

  nameFromData: function(data) {
    if (common.isBlank(data.path)) {
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
    if (common.isBlank(data.path)) {
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
  }
};

UIControls = {
  getFieldTypeSelectTemplate: function() {
    var options = [];
    for (let id in UIHelper.FIELD_TYPES) {
      options.push({ id: id, value: UIHelper.FIELD_TYPES[id].title });
    }
    return {
      view: 'select',
      required: true,
      name: 'type',
      label: STRINGS.TYPE,
      options: options
    };
  },

  getEntityTypeSelectTemplate: function() {
    return {
      view: 'select',
      label: STRINGS.OTHERS_CAN,
      name: 'othersCan',
      hidden: UI.isViewOnly(),
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
          type: 'danger', click: function() { $$(windowId).hide() }
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

}

EntityForm.prototype.listen = function() {
  Mydataspace.on('entities.delete.res', function() {
    $$('entity_form').disable();
  });
};

EntityForm.prototype.setSelectedId = function(id) {
  if (this.selectedId === id) {
    return;
  }
  this.selectedId = id;
  this.refresh();
};

EntityForm.prototype.setData = function(data) {
  var formData = {
    name: UIHelper.nameFromData(data),
    othersCan: data.othersCan,
    description: data.description,
    childPrototype: UI.isViewOnly() ? null : UIHelper.idFromData(data.childPrototype)
  };
  this.clear();
  $$('entity_form').setValues(formData);
  this.addFields(data.fields);
  this.setClean();
};

EntityForm.prototype.refresh = function() {
  $$('entity_form').disable();
  var req = UI.isViewOnly() ? 'entities.get' : 'entities.getWithMeta';
  Mydataspace.request(req, UIHelper.dataFromId(this.selectedId), function(data) {
    this.setData(data);
    $$('entity_form').enable();
  }.bind(this), function(err) {
    UI.error(err);
    $$('entity_form').enable();
  });
};

/**
 * Creates new entity by data received from the 'New Entity' form.
 * @param formData data received from form by method getValues.
 */
//EntityForm.prototype.createByFormData = function(formData) {
//  var newEntityId = UIHelper.childId(this.selectedId, formData.name);
//  var data = UIHelper.dataFromId(newEntityId);
//  data.fields = [];
//  data.type = formData.type;
//  Mydataspace.emit('entities.create', data);
//};

EntityForm.prototype.delete = function() {
  $$('entity_form').disable();
  Mydataspace.request('entities.delete', UIHelper.dataFromId(this.selectedId), function(data) {
    // do nothing because selected item already deleted.
  }, function(err) {
    UI.error(err);
    $$('entity_form').enable();
  });
};

EntityForm.prototype.updateToolbar = function() {
  if (!$$('entity_form').isDirty()) {
    $$('entity_form__save_button').disable();
  } else {
    $$('entity_form__save_button').enable();
  }
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
  common.extendOf(dirtyData, UIHelper.dataFromId(this.selectedId));
  dirtyData.fields = UIHelper.getFieldsForSave(dirtyData.fields, Object.keys(existingData.fields || {}), oldData.fields);
  $$('entity_form').disable();
  if (typeof dirtyData.childPrototype !== 'undefined') {
    dirtyData.childPrototype = UIHelper.dataFromId(dirtyData.childPrototype);
  }
  Mydataspace.request('entities.change', dirtyData, function(res) {
    this.refresh();
    $$('entity_form').enable();
  }.bind(this), function(err) {
    UI.error(err);
    $$('entity_form').enable();
  });
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
  $$('NO_FIELDS_LABEL').show();
  $$('entity_form__run_script_button').hide();
};

EntityForm.prototype.addFields = function(fields, setDirty) {
  for (var i in fields) {
    this.addField(fields[i], setDirty);
  }
};

EntityForm.prototype.addField = function(data, setDirty) {
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
  if ((data.type === 'j' || data.type === 'u') && !$$('entity_form__run_script_button').isVisible()) {
    $$('entity_form__run_script_button').show();
  }
  $$('entity_form').addView({
    id: 'entity_form__' + data.name,
    cols: [
      { view: 'text',
        value: data.name,
        name: 'fields.' + data.name + '.name',
        hidden: true
      },
      { view: data.type === 'j' ? 'textarea' : 'text',
        label: data.name,
        name: 'fields.' + data.name + '.value',
        id: 'entity_form__' + data.name + '_value',
        value: data.value,
        labelWidth: UIHelper.LABEL_WIDTH,
        height: 32,
        css: 'entity_form__text_label',
        readonly: UI.isViewOnly(),
        on: {
          onFocus: function() {
            if (data.type === 'j') {
              this.editScriptFieldId = 'entity_form__' + data.name + '_value';
              $$('edit_script_window__title').setValue(data.name);
              $$('edit_script_window').show();
            }
          }.bind(this)
        }
      },
      { view: 'select',
        width: 70,
        hidden: UI.isViewOnly(),
        options: UIHelper.getFieldTypesAsArrayOfIdValue(),
        value: data.type,
        id: 'entity_form__' + data.name + '_type',
        name: 'fields.' + data.name + '.type',
        on: {
          onChange: function(newv, oldv) {
            if (newv === 'j' || oldv === 'j') {
              var oldValues = webix.copy($$('entity_form')._values);
              webix.ui(
                { view: newv === 'j' ? 'textarea' : 'text',
                  label: data.name,
                  name: 'fields.' + data.name + '.value',
                  id: 'entity_form__' + data.name + '_value',
                  value: data.value,
                  labelWidth: UIHelper.LABEL_WIDTH,
                  height: 32,
                  css: 'entity_form__text_label',
                  on: {
                    onFocus: function() {
                      if (newv === 'j') {
                        this.editScriptFieldId = 'entity_form__' + data.name + '_value';
                        $$('edit_script_window').show();
                      }
                    }
                  }
                },
                $$('entity_form__' + data.name),
                $$('entity_form__' + data.name + '_value')
              );
              $$('entity_form')._values = oldValues;
            }
          }
        }
      },
      { view: 'button',
        type: 'icon',
        icon: 'remove',
        width: 25,
        hidden: UI.isViewOnly(),
        click: function() {
          this.deleteField(data.name);
        }.bind(this)
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

  let hasScripts = false;
  let fields = $$('entity_form').getValues().fields;
  for (let fieldName in fields) {
    let field = fields[fieldName];
    if (field.type === 'j' || field.type === 'u') {
      hasScripts = true;
      break;
    }
  }
  if (!hasScripts) {
    $$('entity_form__run_script_button').hide();
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

EntityList.prototype.onCreate = function(data) {
  var parentId = UIHelper.parentId(UIHelper.idFromData(data));
  var entity = UIHelper.entityFromData(data);
  if (this.getRootId() === parentId) {
    $$('entity_list').add(entity, 1);
    $$('entity_list').select(entity.id);
  }
};

EntityList.prototype.listen = function() {
  Mydataspace.on('entities.delete.res', function(data) {
    var entityId = UIHelper.idFromData(data);

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

  // var subscription = UIHelper.dataFromId(id);
  // var childrenSubscription = UIHelper.dataFromId(id);
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
  var identity = UIHelper.dataFromId(this.getRootId());
  var search = $$('entity_list__search').getValue();
  if (common.isPresent(search)) {
    identity['filterByName'] = search;
  }
  $$('entity_list').disable();
  Mydataspace.request('entities.getChildren', identity, function(data) {
    var showMoreChildId =
      UIHelper.childId(this.getRootId(), UIHelper.ENTITY_LIST_SHOW_MORE_ID);
    var entityId = UIHelper.idFromData(data);
    var children = data.children.map(UIHelper.entityFromData);
    if (this.getRootId() === entityId) {
      if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
        children[children.length - 1] = {
          id: UIHelper.childId(entityId, UIHelper.ENTITY_LIST_SHOW_MORE_ID),
          value: STRINGS.SHOW_MORE
        }
      }
      this.fill(entityId, children);
      $$('entity_list').addCss(showMoreChildId, 'entity_list__show_more_item');
    }
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
EntityList.prototype.fill = function(parentEntityId, children) {
  $$('entity_list').clearAll();
  for (var i in children) {
    $$('entity_list').add(children[i], -1);
  }
  $$('entity_list').add({ id: parentEntityId,  value: '.' }, 0);
  $$('entity_list').select(parentEntityId);
};

/**
 * Creates new entity by data received from the 'New Entity' form.
 * @param formData data received from form by method getValues.
 */
EntityList.prototype.createByFormData = function(formData) {
  var newEntityId = UIHelper.childId(this.getRootId(), formData.name);
  var data = UIHelper.dataFromId(newEntityId);
  data.fields = [];
  data.othersCan = formData.othersCan;
  Mydataspace.emit('entities.create', data);
};

EntityList.prototype.addChildren = function(children) {
  var showMoreChildId =
    UIHelper.childId(this.getRootId(), UIHelper.ENTITY_LIST_SHOW_MORE_ID);

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
  var req = UIHelper.dataFromId(this.getRootId());
  req.offset = this.count();
  Mydataspace.request('entities.getChildren', req, function(data) {
    var children = data.children.map(UIHelper.entityFromData);
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
    if (firstChildId != null && firstChildId !== UIHelper.childId(id, UIHelper.ENTITY_TREE_DUMMY_ID)) {
      resolve();
      return;
    }
    // Load children to first time opened node.
    Mydataspace.request('entities.getChildren', UIHelper.dataFromId(id), function(data) {
      var entityId = UIHelper.idFromData(data);
      var children = data.children.map(UIHelper.entityFromData);
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
  var parentId = UIHelper.parentId(UIHelper.idFromData(data));
  var entity = UIHelper.entityFromData(data);
  if (parentId === 'root') {
    $$('entity_tree').add(entity, 0);
    if (typeof entity.data !== 'undefined' && entity.data.length > 0) {
      this.setChildren(entity.id, entity.data);
    }
    $$('entity_tree').select(entity.id);
  } else if (!common.isNull($$('entity_tree').getItem(parentId)) &&
    common.isNull($$('entity_tree').getItem(UIHelper.childId(parentId, UIHelper.ENTITY_TREE_DUMMY_ID)))) {
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
    var entityId = UIHelper.idFromData(data);

    if ($$('entity_tree').getItem(entityId) == null) {
      return;
    }

    if (entityId === this.getCurrentId()) { // Select other item if selected item is deleted.
      let nextId = $$('entity_tree').getPrevSiblingId(entityId) || $$('entity_tree').getNextSiblingId(entityId) || $$('entity_tree').getParentId(entityId);
      $$('entity_tree').select(nextId);
    }

    $$('entity_tree').remove(entityId);
  }.bind(this));

  Mydataspace.on('entities.create.res', this.onCreate.bind(this));
};

EntityTree.prototype.refresh = function() {
  $$('entity_tree').disable();
  if (UI.isViewOnly()) {
    Mydataspace.request('entities.get', { root: UI.getViewOnlyRoot(), path: '' }, function(data) {
      $$('entity_tree').clearAll();
      // convert received data to treeview format and load its to entity_tree.
      var formattedData = UIHelper.entityFromData(data);
      $$('entity_tree').parse([formattedData]);
      $$('entity_tree').enable();
    }, function(err) {
      UI.error(err);
      $$('entity_tree').enable();
    });
  } else {
    Mydataspace.request('entities.getMyRoots', {}, function(data) {
      $$('entity_tree').clearAll();
      // convert received data to treeview format and load its to entity_tree.
      var formattedData = data['roots'].map(UIHelper.entityFromData);
      $$('entity_tree').parse(formattedData);
      $$('entity_tree').enable();
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
  var dummyChildId = UIHelper.childId(entityId, UIHelper.ENTITY_TREE_DUMMY_ID);
  var showMoreChildId = UIHelper.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID);
  var firstChildId = $$('entity_tree').getFirstChildId(entityId);
  if (firstChildId != null && firstChildId !== dummyChildId) {
    return;
  }
  if (children.length === UIHelper.NUMBER_OF_ENTITIES_LOADED_AT_TIME) {
    children[children.length - 1] = {
      id: UIHelper.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID),
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
  var showMoreChildId = UIHelper.childId(entityId, UIHelper.ENTITY_TREE_SHOW_MORE_ID);
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
  var req = UIHelper.dataFromId(id);
  req.offset = this.numberOfChildren(id);
  Mydataspace.request('entities.getChildren', req, function(data) {
    var entityId = UIHelper.idFromData(data);
    var children = data.children.map(UIHelper.entityFromData);
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
        document.getElementById('no_items').innerText = STRINGS.NO_DATA;
        document.getElementById('no_items').style.display = 'block';
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

UI = {

  entityForm: new EntityForm(),

  entityList: new EntityList(),

  entityTree: new EntityTree(),

  pages: new Pages(),

  isViewOnly: function() {
    return window.location.hash != null && window.location.hash !== '' && window.location.hash !== '#';
  },

  getViewOnlyRoot: function() {
    return window.location.hash.substring(1);
  },

  DISABLED_ON_VIEW_ONLY: [
    'ADD_ROOT_LABEL',
    'ADD_ENTITY_LABEL',
    'entity_form__save_button',
    'ADD_FIELD_LABEL',
    'RUN_SCRIPT_LABEL',
    'entity_form__remove_button'
  ],

  HIDDEN_ON_VIEW_ONLY: [
    'NAME_LABEL_5',
    'CHILD_PROTO_LABEL',
    'DESCRIPTION_LABEL_1'
  ],

  updateViewOnlyState: function() {
    if (UI.isViewOnly()) {
      UI.DISABLED_ON_VIEW_ONLY.forEach(function(item) {
        $$(item).disable()
      });
      UI.HIDDEN_ON_VIEW_ONLY.forEach(function(item) {
        $$(item).hide()
      });
    } else {
      UI.DISABLED_ON_VIEW_ONLY.forEach(function(item) {
        $$(item).enable()
      });
      UI.HIDDEN_ON_VIEW_ONLY.forEach(function(item) {
        $$(item).show()
      });
    }
    UI.entityTree.refresh();
    UI.updateSize();
  },

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
      $$('app_form__save_button').disable();
    } else {
      $$('app_form__save_button').enable();
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
      $('#bootstrap').hide();
      $('#webix').show();
      UI.updateSize();
      UI.refresh();
      $$('SIGN_IN_LABEL').hide();
      $$('menu_button').show();
      $('#signin_modal').modal('hide');
    });

    Mydataspace.on('logout', function() {
      $$('menu').hide();
      if (!UI.isViewOnly()) {
        $('#webix').hide();
        $('#bootstrap').show();
      }
      document.getElementById('no_items').style.display = 'none';
      $$('SIGN_IN_LABEL').show();
      $$('menu_button').hide();
    });

    UI.entityForm.listen();
    UI.entityList.listen();
    UI.entityTree.listen();

    Mydataspace.on('users.getMyProfile.res', function(data) {
      if (common.isBlank(data['avatar'])) {
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

    window.addEventListener('message', function(e) {
      if (e.data.message === 'getScripts') {
        var fields = $$('entity_form').getValues().fields;
        if (typeof fields === 'undefined') {
          fields = {};
        }
        var values = Object.keys(fields).map(function(key) { return fields[key]; });
        values.sort(function(a, b) {
          if (a.type === 'j' && b.type === 'u') {
            return 1;
          } else if (a.type === 'u' && b.type === 'j') {
            return -1;
          } else if (a.type === 'j' && b.type === 'j') {
            if (a.name.toUpperCase() === '__MAIN__') {
              return 1;
            } else if (b.name.toUpperCase() === '__MAIN__') {
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
      view: 'window',
      id: 'edit_script_window',
      modal: true,
      width: 1000,
      position: 'center',
      head: false,
      on: {
        onShow: function() {
          $$('edit_script_window__editor').setValue($$(UI.entityForm.editScriptFieldId).getValue());
          $$('edit_script_window__cancel_button').define('hotkey', 'escape');
        }
      },
      body: {
        rows: [
          { view: 'toolbar',
            elements: [
              { view: 'label',
                id: 'EDIT_SCRIPT_LABEL', label: STRINGS.EDIT_SCRIPT,
                width: 100
              },
              { view: 'label',
                id: 'edit_script_window__title'
              },
              {},
              { view: 'button',
                type: 'icon',
                icon: 'save',
                id: 'SAVE_ENTITY_LABEL', label: STRINGS.SAVE_ENTITY,
                width: 120,
                click: function() {
                  $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
                  UI.entityForm.save();
                }
              },
              { view: 'button',
                type: 'icon',
                icon: 'play',
                id: 'RUN_SCRIPT_LABEL', label: STRINGS.RUN_SCRIPT,
                width: 120,
                click: function() {
                  $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
                  UIHelper.popupCenter('/run_script.html', 'Run Script', 600, 400);
                }
              },
              { view: 'button',
                type: 'icon',
                icon: 'times',
                id: 'CLOSE_LABEL', label: STRINGS.CLOSE,
                id: 'edit_script_window__cancel_button',
                width: 100,
                click: function() {
                  $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
                  $$('edit_script_window').hide();
                }
              }
            ]
          },
          { view: 'ace-editor',
            id: 'edit_script_window__editor',
            theme: 'monokai',
            mode: 'javascript',
            height: 600,
            on: {
              onReady: function(editor) {
                editor.getSession().setTabSize(2);
                editor.getSession().setUseSoftTabs(true);
                // editor.getSession().setUseWrapMode(true);
                editor.getSession().setUseWorker(false);
                // editor.execCommand('find')
                editor.commands.addCommand({
                  name: 'save',
                  bindKey: { win: 'Ctrl-S' },
                  exec: function(editor) {
                    $$(UI.entityForm.editScriptFieldId).setValue($$('edit_script_window__editor').getValue());
                    UI.entityForm.save();
                  }
                });
              }
            }
          }
        ]
      }
    });

    // 'Add new root' window
    webix.ui({
        view: 'window',
        id: 'add_root_window',
        width: 300,
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
    });

    // 'Add new entity' window
    webix.ui({
        view: 'window',
        id: 'add_entity_window',
        width: 300,
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
                var newEntityId = UIHelper.childId(UI.entityList.getRootId(), formData.name);
                var data = UIHelper.dataFromId(newEntityId);
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
    });

    // 'Add new field' window
    webix.ui({
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
            var typeInfo = UIHelper.FIELD_TYPES[values.type];
            return typeof typeInfo !== 'undefined' && typeInfo.isValidValue(value);
          }
        }
      }
    });

    //
    // 'Add new app' window
    //
    webix.ui({
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
    });

    //
    // Left side menu
    //
		webix.ui({
			view: 'sidemenu',
			id: 'menu',
			width: 200,
			position: 'right',
			state: function(state) {
				var toolbarHeight = 46;
				state.top = toolbarHeight;
				state.height -= toolbarHeight;
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
    });

    //
    // Admin panel
    //
    webix.ui({
      id: 'admin_panel',
      container: 'admin_panel',
      rows: [
        { cols: [
            { type: 'header', template: 'my data space' },
            { view: 'button',
              width: 110,
              css: 'menu__language_button menu__language_button--get_started',
              id: 'GET_STARTED_LABEL',
              label: STRINGS.GET_STARTED,
              click: function() {
                location.href = 'get-started';
              }
            },
            { view: 'button',
              width: 90,
              css: 'menu__language_button',
              id: 'DEMOS_LABEL',
              label: STRINGS.DEMOS,
              click: function() {
                location.href = 'demos';
              }
            },
            { view: 'button',
              width: 120,
              css: 'menu__language_button',
              id: 'DOCS_LABEL',
              label: STRINGS.DOCS,
              click: function() {
                location.href = 'docs';
              }
            },
            { width: 20, css: 'menu__spacer' },
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
            { width: 20, css: 'menu__spacer' },
            { view: 'button',
              width: 80,
              hidden: localStorage.getItem('authToken') != null,
              id: 'SIGN_IN_LABEL',
              css: 'menu__login_button',
              label: STRINGS.SIGN_IN,
              click: function() {
                $('#signin_modal').modal('show');
              }
            },
            { view: 'icon',
              icon: 'bars',
              hidden: localStorage.getItem('authToken') == null,
              id: 'menu_button',
              css: 'menu_button',
              click: function() {
                if( $$('menu').config.hidden) {
                  $$('menu').show();
                }
                else
                  $$('menu').hide();
              }
            }
          ]
        },

        //
        // My Apps Page
        //
        { id: 'my_apps_panel',
          height: window.innerHeight - 46,
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
            },
            // Selected app edit
            { id: 'my_apps_panel__right_panel',
              rows: [
              { view: 'toolbar',
                cols: [
                  { view: 'button',
                    type: 'icon',
                    icon: 'save',
                    id: 'SAVE_LABEL', label: STRINGS.SAVE,
                    id: 'app_form__save_button',
                    width: 110,
                    click: function() {
                      UI.appForm_save();
                    }
                  },
                  { view: 'button',
                    type: 'icon',
                    icon: 'refresh',
                    id: 'REFRESH_APP_LABEL', label: STRINGS.REFRESH_APP,
                    width: 120,
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
                    width: 100,
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
        },

        //
        // My Data Page
        //
        { id: 'my_data_panel',
          height: window.innerHeight - 46,
          cols: [
            { id: 'my_data_panel__left_panel',
              rows: [
                { view: 'toolbar',
                  elements: [
                    { view: 'button',
                      type: 'icon',
                      icon: 'plus',
                      id: 'ADD_ROOT_LABEL', label: STRINGS.ADD_ROOT,
                      disabled: UI.isViewOnly(),
                      width: 130,
                      click: function() {
                        $$('add_root_window').show();
                      }
                    },
                    { view: 'button',
                      type: 'icon',
                      icon: 'refresh',
                      id: 'REFRESH_LABEL', label: STRINGS.REFRESH,
                      width: 100,
                      click: function() {
                        UI.pages.refreshPage('data');
                      }
                    },
                    {}
                  ]
                },
                { view: 'tree',
                  id: 'entity_tree',
                  gravity: 0.4,
                  select: true,
                  on: {
                    onAfterLoad: function() {
                      $$('entity_tree').select(UI.entityTree.setCurrentIdToFirst());
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
                        UI.entityTree.showMore(UIHelper.parentId(id));
                      }
                    }
                  }
                }
              ]
            },
            {
              id: 'my_data_panel__resizer_1',
              view: 'resizer'
            },
            { id: 'my_data_panel__central_panel',
              rows: [
                { view: 'toolbar',
                  cols: [
                    { view: 'button',
                      type: 'icon',
                      icon: 'plus',
                      id: 'ADD_ENTITY_LABEL', label: STRINGS.ADD_ENTITY,
                      disabled: UI.isViewOnly(),
                      width: 110,
                      click: function() {
                        $$('add_entity_window').show();
                      }
                    },
                    { view: 'search',
                      id: 'entity_list__search',
                      align: 'center',
                      placeholder: STRINGS.SEARCH,
                      on: {
                        onKeyPress: function(code, e) {
                          if (code === 13 && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                            UI.entityList.refreshData();
                            return false;
                          }
                        }
                      }
                    }
                  ]
                },
                { view: 'list',
                  id: 'entity_list',
                  select: true,
                  template: '<div>#value#</div>',
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
                      var parentId = UIHelper.parentId(id);
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
            },
            {
              id: 'my_data_panel__resizer_2',
              view: 'resizer'
            },
            { id: 'my_data_panel__right_panel',
              rows: [
              { view: 'toolbar',
                cols: [
                  { view: 'button',
                    type: 'icon',
                    icon: 'save',
                    id: 'entity_form__save_button',
                    disabled: UI.isViewOnly(),
                    width: 30,
                    click: function() {
                      UI.entityForm.save();
                    }
                  },
                  { view: 'button',
                    type: 'icon',
                    icon: 'refresh',
                    id: 'entity_form__refresh_button',
                    width: 30,
                    click: function() {
                      UI.entityForm.refresh();
                    }
                  },
                  { view: 'button',
                    type: 'icon',
                    icon: 'plus',
                    id: 'ADD_FIELD_LABEL', label: STRINGS.ADD_FIELD,
                    disabled: UI.isViewOnly(),
                    width: 120,
                    click: function() {
                      $$('add_field_window').show();
                    }
                  },
                  { view: 'button',
                    type: 'icon',
                    icon: 'play',
                    id: 'RUN_SCRIPT_LABEL', label: STRINGS.RUN_SCRIPT,
                    disabled: UI.isViewOnly(),
                    width: 100,
                    id: 'entity_form__run_script_button',
                    hidden: true,
                    click: function() {
                      UIHelper.popupCenter('/run_script.html', 'Run Script', 600, 400);
                    }
                  },
                  {},
                  { view: 'button',
                    type: 'icon',
                    icon: 'remove',
                    id: 'entity_form__remove_button',
                    disabled: UI.isViewOnly(),
                    width: 30,
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
                  }
                ]
              },
              { view: 'form',
                id: 'entity_form',
                css: 'entity_form',
                complexData: true,
                scroll: true,
                elements: [
                  { view: 'text',
                    id: 'NAME_LABEL_5',
                    label: STRINGS.NAME,
                    name: 'name',
                    labelWidth: UIHelper.LABEL_WIDTH,
                    readonly: UI.isViewOnly()
                  },
                  UIControls.getEntityTypeSelectTemplate(),
                  { view: 'text',
                    id: 'CHILD_PROTO_LABEL',
                    label: STRINGS.CHILD_PROTO,
                    name: 'childPrototype',
                    labelWidth: UIHelper.LABEL_WIDTH,
                    hidden: UI.isViewOnly()
                  },
                  { view: 'textarea',
                    css: 'entity_form__description',
                    height: 100,
                    id: 'DESCRIPTION_LABEL_1',
                    label: STRINGS.DESCRIPTION,
                    name: 'description',
                    labelWidth: UIHelper.LABEL_WIDTH,
                    hidden: UI.isViewOnly()
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
            ]}
          ]
        }
      ]
    });

    webix.event(window, 'resize', function(e) {
      UI.updateSize();
    });

    window.addEventListener('error', function (e) {
      UI.error(e.error.message);
      return false;
    });
  },

  updateSize: function() {
    $$('admin_panel').define({
      width: window.innerWidth,
      height: window.innerHeight
    });
    $$('my_data_panel').define({
      height: window.innerHeight - 46
    });
    $$('my_apps_panel').define({
      height: window.innerHeight - 46
    });
    $$('admin_panel').resize();
  }
};
