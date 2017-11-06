test(
  'TableGrid.subgrid test',

  [
    'ephox.katamari.api.Fun',
    'ephox.snooker.api.Structs',
    'ephox.snooker.model.TableGrid'
  ],

  function (Fun, Structs, TableGrid) {
    var r = Structs.rowcells;
    var en = Structs.elementnew;

    var check = function (expected, row, column, grid) {
      var actual = TableGrid.subgrid(grid, row, column, Fun.tripleEquals);
      assert.eq(expected.rowspan, actual.rowspan());
      assert.eq(expected.colspan, actual.colspan());
    };

    var world = [
      r([ en('a', false), en('a', false), en('a', false) ], 'thead'),
      r([ en('b', false), en('b', false), en('c', false) ], 'tbody'),
      r([ en('d', false), en('e', false), en('c', false) ], 'tfoot')
    ];

    check({ colspan: 3, rowspan: 1 }, 0, 0, world);
    check({ colspan: 2, rowspan: 1 }, 0, 1, world);
    check({ colspan: 2, rowspan: 1 }, 1, 0, world);
    check({ colspan: 1, rowspan: 1 }, 2, 0, world);
  }
);