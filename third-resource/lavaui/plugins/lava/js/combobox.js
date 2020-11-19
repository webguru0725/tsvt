!(function(a) {
    var c = {
        init: function(c) {
            var v = this,
                b = a(c),
                h = b.data('combobox').options;
            b.combo(h);
            var g = b
                .data('combo')
                .panel.addClass('list-group')
                .css({ overflow: 'auto' });
            (b.data('combobox').panel = g),
                h.url ? v.remoteData(b, h, g) : h.data && v.loadData(b, h, g),
                v.initEvent(b, h, g);
        },
        loadData: function(a, c, v, b) {
            for (var h = c.data, g = [], V = a.val(), i = 0; i < h.length; i++)
                (!b || b(V, h[i])) &&
                    g.push(
                        "<a href='javascript:;' class='list-group-item' data-value='" +
                            h[i][c.valueField] +
                            "'>" +
                            h[i][c.textField] +
                            '</a>'
                    );
            v.html(g.join('')), c.onLoadSuccess && c.onLoadSuccess();
        },
        remoteData: function(c, v, b) {
            var h = this;
            a.ajax({
                url: v.url,
                type: v.method,
                dataType: 'json',
                data: v.formData,
                success: function(a) {
                    v.loadFilter && (a = v.loadFilter(a)), (v.data = a), h.loadData(c, v, b);
                }
            });
        },
        initEvent: function(c, v, b) {
            var h = this;
            b.delegate('.list-group-item', 'click', function() {
                var g = a(this),
                    V = g.attr('data-value');
                v.multiple
                    ? (g.hasClass('active')
                          ? (g.removeClass('active'),
                            h.setValue(c, v, V, !1),
                            v.onUnselect && v.onUnselect(h.getItemByValue(v.data, V, v.valueField)))
                          : (g.addClass('active'),
                            h.setValue(c, v, V, !0),
                            v.onSelect && v.onSelect(h.getItemByValue(v.data, V, v.valueField))),
                      h.setInputValue(c, v.values, v.textField))
                    : (g.hasClass('active') ||
                          (b.find('.active').removeClass('active'),
                          g.addClass('active'),
                          h.setValue(c, v, V),
                          v.onSelect && v.onSelect(h.getItemByValue(v.data, V, v.valueField))),
                      b.hide());
            }),
                'local' == v.mode && v.filter
                    ? c.on('keyup', function() {
                          (v.value = null),
                              c.timer && clearTimeout(c.timer),
                              (c.timer = setTimeout(function() {
                                  h.loadData(c, v, b, v.filter);
                              }, 200));
                      })
                    : 'remote' == v.mode &&
                      v.loader &&
                      c.on('keyup', function() {
                          (v.values = {}),
                              c.timer && clearTimeout(c.timer),
                              (c.timer = setTimeout(function() {
                                  v.loader(
                                      { q: c.val() },
                                      function(a) {
                                          (v.data = a), h.loadData(c, v, b);
                                      },
                                      function() {
                                          console.log && console.log('loader: load err.');
                                      }
                                  );
                              }, 200));
                      });
        },
        setValue: function(a, c, v, b) {
            var h = this,
                g = (c.data, c.values),
                V = h.getItemByValue(c.data, v, c.valueField);
            void 0 == b
                ? ((c.value = v), a.val(V ? V[c.textField] : ''))
                : 1 == b
                ? (g[v] = V ? V[c.textField] : '')
                : delete g[v];
        },
        getItemByValue: function(a, c, v) {
            for (var i = 0; i < a.length; i++) if (a[i][v] == c) return a[i];
            return null;
        },
        setInputValue: function(a, c) {
            var v = [];
            for (var i in c) v.push(c[i]);
            a.val(v.join(','));
        },
        setValues: function(c, v) {
            var b = a(c),
                h = b.data('combobox').options,
                g = this;
            h.values = {};
            for (var i = 0; i < v.length; i++) {
                var V = g.getItemByValue(h.data, v[i], h.valueField);
                h.values[v[i]] = V ? V[h.textField] : '';
            }
            g.setInputValue(b, h.values, h.textField);
        }
    };
    (a.fn.combobox = function(v, b) {
        return 'string' == typeof v
            ? a.fn.combobox.methods[v](this, b)
            : void a.each(this, function() {
                  var b = {};
                  a.extend(b, a.fn.combo.defaults),
                      a.extend(b, a.fn.combobox.defaults),
                      a.extend(b, v),
                      a(this).data('combobox', { options: b }),
                      c.init(this);
              });
    }),
        (a.fn.combobox.defaults = {
            url: null,
            method: 'get',
            valueField: 'id',
            textField: 'text',
            multiple: !1,
            panelHeight: 250,
            value: null,
            values: {},
            mode: 'local',
            filter: null,
            formData: {},
            onSelect: null,
            onLoadSucces: null
        }),
        (a.fn.combobox.methods = {
            getValue: function(c) {
                return a(c).data('combobox').options.value;
            },
            getValues: function(c) {
                var v = a(c).data('combobox').options.values,
                    b = [];
                for (var i in v) b.push(i);
                return b;
            },
            setValue: function(v, b) {
                var h = a(v),
                    g = h.data('combobox').options;
                c.setValue(h, g, b),
                    h
                        .data('combobox')
                        .panel.find('.active')
                        .removeClass('active'),
                    h
                        .data('combobox')
                        .panel.find('[data-value="' + b + '"]')
                        .addClass('active');
            },
            setValues: function(v, b) {
                var h = a(v);
                c.setValues(v, b),
                    h
                        .data('combobox')
                        .panel.find('.active')
                        .removeClass('active');
                for (var i in b)
                    h.data('combobox')
                        .panel.find('[data-value="' + b[i] + '"]')
                        .addClass('active');
            },
            reload: function(v, b) {
                var h = a(v);
                b && (h.data('combobox').options.url = b),
                    c.remoteData(h, h.data('combobox').options, h.data('combo').panel);
            }
        });
})(jQuery);
