{% if jekyll.environment == "local" %}
{% assign client_id = "my-data.space" %}
{% assign api_url = site.local_api_url %}
{% assign cdn_url = site.local_api_url %}
{% else %}
{% assign client_id = site.client_id %}
{% assign api_url = site.api_url %}
{% assign cdn_url = site.cdn_url %}
{% endif %}

{% if page.language == 'en' %}
{% assign lang_prefix = '' %}
{% else %}
{% assign lang_prefix = page.language|prepend:'/' %}
{% endif %}



var search_{{include.id}}_url = '';
var search_{{include.id}}_pathname = MDSCommon.endsWith(window.location.pathname, '/datasources')  ? '{{ lang_prefix }}/datasources' : '{{ lang_prefix }}/search';
var search_{{include.id}}_displayMode = localStorage.getItem('searchDisplayMode') || 'snippet';
var isAdmin_{{include.id}} = {{include.admin}};
var search_{{include.id}}_license_drops = [];

if (MDSCommon.endsWith(window.location.pathname, search_{{include.id}}_pathname)) {
  document.getElementById('{{include.id}}_input').classList.add('header__search_input--focus');
  document.getElementsByClassName('smoke')[0].classList.add('smoke--fullscreen--opaque');
  document.getElementById('{{include.id}}_input').value = search_parseQuery();
  document.getElementById('{{include.id}}_input').setAttribute('placeholder', '{{ site.data[page.language].header.input_search_fixed }}');
}

function set_search_{{include.id}}_displayMode(mode) {
  search_{{include.id}}_displayMode = mode;
  localStorage.setItem('searchDisplayMode', mode);
}

function closeSearch_{{include.id}}() {
  document.getElementById('{{include.resultContainer}}').style.display = 'none';
  if (isAdmin_{{include.id}}) {
    document.getElementById('webix_preloaded_header').classList.remove('webix_preloaded_header--top');
  } else {
    document.getElementsByTagName('body')[0].classList.remove('body_fixed');
    var header = document.getElementById('header');
    if (header) {
      header.style.display = 'block';
    }

    document.getElementsByClassName('smoke')[0].classList.remove('smoke--fullscreen');
    document.getElementsByClassName('navbar')[0].classList.remove('navbar--fixed');
    var default_main = document.getElementsByClassName('default_main')[0];
    if (default_main) {
      default_main.classList.remove('default_main--fullscreen');
    }
    document.getElementById('search').classList.remove('search--fullscreen');
    if (document.getElementById('page_footer')) {
      document.getElementById('page_footer').classList.remove('footer--fullscreen');
    }
  }
  if (document.getElementById('admin_panel')) {
    document.getElementById('admin_panel').classList.remove('admin_panel--fullscreen');
    document.getElementById('no_items').classList.remove('no_items--fullscreen');
  }
}

function openSearch_{{include.id}}(search, mode) {
  if (search == null) {
    search = search_parseQuery();
    document.getElementById('{{include.id}}_input').value = search_parseQuery();
  }
  document.getElementById('{{include.id}}_input').value = search;
  document.getElementById('{{include.id}}_input').focus();
  startSearch_{{include.id}}(search);
}

function removeSearchPart_{{include.id}}(part) {
  var search = document.getElementById('{{include.id}}_input').value;
  var newSearch = search.replace(part, '').replace(/^\s+/, '').replace(/\s+/, ' ').trim();
  if (newSearch !== '') {
    newSearch += ' ';
  }
  openSearch_{{include.id}}(newSearch);
}

function setSearchPart_{{include.id}}(part) {
  var search = document.getElementById('{{include.id}}_input').value;
  if (part[0] !== '#') { // search string
    search += part;
  } else {
    var prefix = part.split(':')[0];
    if (prefix === part) { // tag
      if (search.indexOf(part) < 0) {
        search += ' ' + part;
      }
    } else { // filter
      var newSearch = search.replace(new RegExp(prefix + ':[^\\s#]\\b'), part);
      if (search === newSearch) {
        if (MDSCommon.isPresent(search)) {
          search += ' ';
        }
        search += part;
      } else {
        search = newSearch;
      }
    }
  }
  openSearch_{{include.id}}(search);
}

function startSearch_{{include.id}}(search) {
  var searchOptions = search_parseSearchString(search);
  var filters = searchOptions.filters;

  var q;
  var m;
  switch (MDSCommon.getPathName(search_{{include.id}}_pathname)) {
  case 'search':
    q = {
      search: searchOptions.search,
      profiles: true,
      filter: searchOptions.filters,
      type: searchOptions.type
    };
    m = 'entities.getRoots';
    break;
  case 'datasources':
    q = {
      root: 'datasources',
      path: 'data',
      children: true,
      search: searchOptions.search,
      filter: searchOptions.filters,
      group: [
        'country',
        'language'
      ]
    };
    m = 'entities.get';
    break;
  }

  // Try to get roots from server
  Mydataspace.request(m, q, function(data) {
    var items = data.root === 'datasources' ?  data.children : data.roots;

    var rootsHtml = items.map(function(root) {
      var itemId = root.root === 'datasources' ? root.path : root.root;
      var itemUrlQuery = root.root === 'datasources' ? 'search?tags=src:' + MDSCommon.getPathName(root.path) : root.root;

      var avatar = MDSCommon.findValueByName(root.fields, 'avatar');
      if (MDSCommon.isBlank(avatar)) {
        avatar = '/images/icons/root.svg';
      } else {
        avatar = 'https://cdn.mydataspace.net/avatars/sm/' + avatar + '.png';
      }

      var tags = (MDSCommon.findValueByName(root.fields, 'tags') || '').split(' ').filter(function(tag) {
        return tag != null && tag != '';
      }).map(function(tag) {
        return '<span class="view__tag" onclick="openSearch_{{include.id}}(\'' + tag + '\'); return false;">' + tag + '</span>';
      }).join(' ');

      var languageAbbr = MDSCommon.findValueByName(root.fields, 'language');
      var countryAbbr = MDSCommon.findValueByName(root.fields, 'country');
      var category = MDSCommon.findValueByName(root.fields, 'category');
      var country = COUNTRIES[countryAbbr];
      var language = COUNTRIES[languageAbbr];

      if (category) {
        tags = '<span class="view__tag" onclick="openSearch_{{include.id}}(\'#cat:' + category + '\'); return false;"><i class="view__tag_icon fa fa-' + CATEGORY_ICONS[category] + '"></i><span>' + tr$('categories.' + category) + '</span></span> ' + tags;
      }


      if (country && (languageAbbr === countryAbbr || (language.same || []).indexOf(countryAbbr) != -1)) {
        tags = '<span class="view__tag view__tag--flag view__tag--multi_link">' +
          '<img class="view__tag_icon view__tag_icon--flag" src="/images/square_flags/' + country.name + '.svg" />' +
          '<span class="view__tag_link" onclick="openSearch_{{include.id}}(\'#lang:' + languageAbbr + '\'); return false;">' +
          tr$('languagesShort.' + languageAbbr) + '</span> / ' +
          '<span class="view__tag_link" onclick="openSearch_{{include.id}}(\'#ctry:' + countryAbbr + '\'); return false;">' +
          tr$('countries.' + countryAbbr) + '</span></span> ' + tags;
      } else {
        if (country) {
          tags = '<span class="view__tag view__tag--flag" onclick="openSearch_{{include.id}}(\'#ctry:' + countryAbbr + '\'); return false;">' +
            '<img class="view__tag_icon view__tag_icon--flag" src="/images/square_flags/' + country.name + '.svg" />' +
            tr$('countries.' + countryAbbr) + '</span> ' + tags;
        }

        if (language) {
          tags = '<span class="view__tag view__tag--flag" onclick="openSearch_{{include.id}}(\'#lang:' + languageAbbr + '\'); return false;">' +
            '<img class="view__tag_icon view__tag_icon--flag" src="/images/square_flags/' + language.name + '.svg" />' +
            tr$('languagesShort.' + languageAbbr) + '</span> ' + tags;
        }
      }

      if (MDSCommon.findValueByName(root.fields, '$type') === 't') {
        tags = '<span class="view__tag" onclick="openSearch_{{include.id}}(\'#type:template\'); return false;"><i class="view__tag_icon fa fa-copy"></i><span>' + tr$('types.template') + '</span></span> ' + tags;
      }

      var license = MDSCommon.findValueByName(root.fields, 'license');
      if (MDSCommon.isPresent(license)) {
        var licenseOrig = license;
        license = getLicenseWithoutVersion(license);

        if (license === 'none') {
          tags = '<span class="view__tag view__tag--license-none" onclick="openSearch_{{include.id}}(\'#license:none\'); return false;">' + tr$('licenses.none') + '</span> ' + tags;
        } else {
          tags = '<span class="view__tag view__tag--license' +
            ' view__tag--license--' + license +
            ' view__tag--license--' + license + '--' + (getCurrentLanguage() || 'en').toLowerCase() +
            '" onclick="openSearch_{{include.id}}(\'#license:' + license + '\'); return false;"' +
            ' data-license="' + licenseOrig + '"' +
            ' data-root="' + root.root + '"' +
            '>&nbsp;</span> ' + tags;
        }
      }

      var nLikes = MDSCommon.findValueByName(root.fields, '$likes') || MDSCommon.findValueByName(root.fields, 'totalLikes') || 0;
      var nComments = MDSCommon.findValueByName(root.fields, '$comments') || MDSCommon.findValueByName(root.fields, 'totalComments') || 0;

      var languageMatch = location.pathname.match(/^\/(\w\w)(\/.*)?$/);

      var lang = languageMatch ? languageMatch[1] + '/' : '';

      var footer;

      if (root.profile && data.profiles[root.profile]) {
        var ds = MDSCommon.findValueByName(root.fields, 'datasource');

        var authorAvatar = 'https://cdn.mydataspace.net/avatars/sm/' + (data.profiles[root.profile].avatar || 'HJYrGU87W') + '.png';
        footer =
          '<div class="snippet__author">' +
          '  <img class="snippet__author_avatar" src="' + authorAvatar + '" />' +
          '  <span class="snippet__author_name">'
          + data.profiles[root.profile].name +
          (ds ? ' / <span class="link" onclick="openSearch_{{include.id}}(\'#src:' + ds + '\'); return false;">' + ds + '</span>' : '') +
          '  </span>' +
          (data.profiles[root.profile].verified ? '<i class="fa fa-check snippet__author_verified" aria-hidden="true"></i>' : '') +
          '</div>';
      } else {
        footer =
          '<div class="snippet__date view__comment__date view__date_wrap">' +
          '  ' + tr$('created') + ' <span class="view__date" id="view__date">' + MDSCommon.humanizeDate(root.createdAt) + '</span> ' + tr$('ago') +
          '</div>';
      }

      var colWidth = search_{{include.id}}_displayMode === 'snippet' ? 6 : 12;
      var snippetClass = search_{{include.id}}_displayMode === 'snippet' ? '' : 'snippet--line';

      return '<div class="col-md-' + colWidth + '"><a class="block snippet ' + snippetClass + ' clearfix" href="/' + lang + itemUrlQuery + '">\n' +
        '  <div class="snippet__overview">\n' +
        '  <img class="snippet__image" src="' + avatar + '" />\n' +
        '  <div class="snippet__info' + (MDSCommon.isBlank(tags) ? ' snippet__info--small' : '') + '">\n' +
        '    <div class="snippet__title">' + (MDSCommon.findValueByName(root.fields, 'name') || itemId) + '</div>\n' +
        '    <div class="snippet__tags">' +
        (tags || '') +
        '    </div>\n' +
        '</div>\n' + // info

        '</div>\n' + // overview
        '  <div class="snippet__description">' + (MDSCommon.findValueByName(root.fields, 'description') || '') + '</div>\n' +

        '<div class="snippet__footer">' +
        footer +
        '<div class="snippet__counters">' +
        '<span class="root_counter"><i class="fa fa-heart" aria-hidden="true"></i><span class="root_counter__count root_counter__count--likes">' + nLikes + '</span></span>' +
        '<span class="root_counter"><i class="fa fa-comments" aria-hidden="true"></i><span class="root_counter__count">' + nComments + '</span></span>' +
        '</div>' +
        '</div>' + // footer
        '</a></div>';
    });

    function getFilterHTML(items, itemTitlesCollection, prefix, filters, opts) {
      if (MDSCommon.isBlank(items) || MDSCommon.isEmptyObject(items)) {
        return '';
      }
      var options = MDSCommon.extend({
        translate: true,
        facetIconClass: null,
        facetIconMap: null
      }, opts);
      var filter = TAGS_TO_FILTERS[prefix];
      var title = tr$(filter);
      if (MDSCommon.isBlank(items)) {
        return '';
      }

      var filtersHTML = Object.keys(items).map(function(facet) {

        if (filters[filter] && filters[filter] !== facet) {
          return '';
        }
        var active = filters[filter] === facet;
        var classes = active ? 'search_filter__item--active' : '';
        var action = active ? 'remove' : 'set';
        var title = options.translate ? tr$(itemTitlesCollection + '.' + facet) : facet;
        if (!title) {
          return '';
        }
        var iconHTML;
        if (options.facetIconClass) {
          var iconClassSuffix = options.facetIconMap ? options.facetIconMap[facet] : facet;
          iconHTML = '<i class="' + options.facetIconClass + iconClassSuffix + '"></i>';
        } else {
          iconHTML = '';
        }

        return '<a href="javascript:void(0)" onclick="' + action + 'SearchPart_{{include.id}}(\'#' + prefix + ':' + facet + '\')" class="search_filter__item ' + classes + '">' +
          iconHTML +
          '<span class="search_filter__item_title">' + title + '</span>' +
          '<span class="search_filter__item_count">' + items[facet].count + '</span>' +
          '<i class="search_filter__item_remove fa fa-remove"></i>' +
          '</a>';
      }).join('');

      return '<div class="search_filter">' +
        '<div class="search_filter__title">' + title + '</div>' +
        '<div class="search_filter__items">' + filtersHTML + '</div>' +
        '</div>';
    }

    var datasourceInfoHTML = '';

    if (searchOptions.filters.datasource) {
      datasourceInfoHTML = '<div class="search__datasource datasource" id="search_{{include.id}}__datasource"></div>';
      Mydataspace.request('entities.get', { root: 'datasources', path: 'data/' + searchOptions.filters.datasource }).then(function(datasourceData) {
        document.getElementById('search_{{include.id}}__datasource').innerHTML =
          '<img class="datasource__img" src="{{ cdn_url }}/avatars/md/' + MDSCommon.findValueByName(datasourceData.fields, 'avatar') + '.png" />' +
          '<div class="datasource__title">' + MDSCommon.findValueByName(datasourceData.fields, 'name') + '</div>' +
          '<div class="datasource__name"><a href="http://' + MDSCommon.getPathName(datasourceData.path) + '">' +
          MDSCommon.getPathName(datasourceData.path) + '</a></div>';
      });
    }

    var xxx;
    var xxx_pathname;
    var found_suffix;
    switch (MDSCommon.getPathName(search_{{include.id}}_pathname)) {
    case 'search':
      xxx = '{{ site.data[page.language].search.search_by_datasources }}';
      xxx_pathname = '{{ lang_prefix }}/datasources';
      found_suffix = ' {{ site.data[page.language].search.found_suffix }} '
      break;
    case 'datasources':
      xxx = '{{ site.data[page.language].search.search_by_roots }}';
      xxx_pathname = '{{ lang_prefix }}/search';
      found_suffix = ' {{ site.data[page.language].search.found_in_datasource_suffix }} '
      break;
    }
    var foundInDatasourceSuffix = searchOptions.filters.datasource ? '{{ site.data[page.language].search.found_in_datasource }}' : '';
    document.getElementById('{{include.resultContainer}}').innerHTML =
      rootsHtml.length > 0 ?
        '<div class="container search__content">' +
        '<div class="search__results">' +
        '<div class="search__header ' + (searchOptions.filters.datasource ? 'search__header--found-in-datasource' : '') + ' clearfix">' +
        '<div class="search__found_count">{{ site.data[page.language].search.found_prefix }} ' + items.length + found_suffix + foundInDatasourceSuffix + '</div>' +
        '<div class="btn-group search__display_modes" role="group">' +
        '<button type="button" class="btn btn-default ' + (search_{{include.id}}_displayMode === 'line' ? 'active' : '') + '" onclick="set_search_{{include.id}}_displayMode(\'line\'); startSearch_{{include.id}}(document.getElementById(\'{{include.id}}_input\').value);"><i class="fa fa-list"></i></button>' +
    '<button type="button" class="btn btn-default ' + (search_{{include.id}}_displayMode === 'snippet' ? 'active' : '') + '" onclick="set_search_{{include.id}}_displayMode(\'snippet\'); startSearch_{{include.id}}(document.getElementById(\'{{include.id}}_input\').value);"><i class="fa fa-th-large"></i></button>' +
    '</div>' +
    '<div class="search__right_link"><a href="{{ lang_prefix }}/datasources" onclick="search_{{include.id}}_pathname = \'' + xxx_pathname + '\'; openSearch_{{include.id}}(\'\'); return false;">' + xxx + '</a></div>' +
    '</div>' +
    datasourceInfoHTML +
    '<div class="row">' + rootsHtml.join('\n') + '</div>' +
    '</div>' +
    '<div class="search__filter_panel_wrap">' +
    '<div class="search__filter_panel">' +
    getFilterHTML(data.facets && data.facets.language, 'languages', 'lang', filters, { facetIconClass: 'search_filter__icon flag-icon flag-icon-' }) +
    getFilterHTML(data.facets && data.facets.country, 'countries', 'ctry', filters, { facetIconClass: 'search_filter__icon flag-icon flag-icon-' }) +
    getFilterHTML(data.facets && data.facets.category, 'categories', 'cat', filters, {
      facetIconClass: 'search_filter__icon fa fa-',
      facetIconMap: CATEGORY_ICONS
    }) +
    '</div>' +
    '</div>' +
    '</div>' : '<div class="container search__content"><div class="search__no_results">{{ site.data[page.language].search.no_results }}</div></div>';

    search_{{include.id}}_license_drops.forEach(function(drop) {
      drop.destroy();
    });

    search_{{include.id}}_license_drops = createLicenseDrop({
      selector: '#{{include.resultContainer}} .view__tag--license',
      language: '{{ page.language }}',
      openDelay: 400
    });
  }, function(err) {
    console.log(err);
  });
}

//
// Show suggestions when search input focused
document.getElementById('{{include.id}}_input').addEventListener('focus', function() {
  if (['{{ lang_prefix }}/search', '{{ lang_prefix }}/datasources'].indexOf(window.location.pathname) === -1) {
    search_{{include.id}}_url = window.location.href;
  }

  history.replaceState({ search: document.getElementById('{{include.id}}_input').value },
    'Search', search_{{include.id}}_pathname + search_getQueryFromSearchString(document.getElementById('{{include.id}}_input').value));

  document.getElementById('{{include.resultContainer}}').style.display = 'block';

  if (isAdmin_{{include.id}}) {
    document.getElementById('webix_preloaded_header').classList.add('webix_preloaded_header--top');
  } else {
    document.getElementsByTagName('body')[0].classList.add('body_fixed');
    var header = document.getElementById('header');
    if (header) {
      header.style.display = 'none';
    }
    document.getElementsByClassName('smoke')[0].classList.add('smoke--fullscreen');
    document.getElementsByClassName('navbar')[0].classList.add('navbar--fixed');
    var default_main = document.getElementsByClassName('default_main')[0];
    if (default_main) {
      default_main.classList.add('default_main--fullscreen');
    }
    document.getElementById('search').classList.add('search--fullscreen');
    if (document.getElementById('page_footer')) {
      document.getElementById('page_footer').classList.add('footer--fullscreen');
    }
  }

  if (document.getElementById('admin_panel')) {
    document.getElementById('admin_panel').classList.add('admin_panel--fullscreen');
    document.getElementById('no_items').classList.add('no_items--fullscreen');

  }

  startSearch_{{include.id}}(document.getElementById('{{include.id}}_input').value);
});

//
// Filter suggestions when search input text changed
document.getElementById('{{include.id}}_input').addEventListener('keyup', function(event) {
  var url1 = search_{{include.id}}_url.split('?')[0];
  var url2 = window.location.href.split('?')[0];

  if (event.keyCode === 27 && url1 !== '' && url1 != url2) {
    closeSearch_{{include.id}}();
    document.getElementById('{{include.id}}_input').blur();
    history.replaceState({}, '', search_{{include.id}}_url);
    document.getElementById('{{include.id}}_input').value = '';
    return;
  }
  history.replaceState({}, '', search_{{include.id}}_pathname + search_getQueryFromSearchString(document.getElementById('{{include.id}}_input').value));
  startSearch_{{include.id}}(document.getElementById('{{include.id}}_input').value);
}, false);

if (isAdmin_{{include.id}}) {
  window.addEventListener('hashchange', function() {
    closeSearch_{{include.id}}();
  }, false);
}