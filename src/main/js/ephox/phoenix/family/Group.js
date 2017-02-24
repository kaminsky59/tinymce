define(
  'ephox.phoenix.family.Group',

  [
    'ephox.compass.Arr',
    'ephox.phoenix.api.general.Extract',
    'ephox.phoenix.extract.TypedItem',
    'ephox.polaris.api.Arrays',
    'ephox.polaris.api.Splitting'
  ],

  function (Arr, Extract, TypedItem, Arrays, Splitting) {
    /**
     * Return an array of arrays split by boundaries (exclude) or empty tags (include).
     */
    var group = function (universe, items, optimise) {
      var extractions = Arr.bind(items, function (item) {
        return Extract.from(universe, item, optimise);
      });

      // TBIO-3432: Previously, we only split by boundaries. Now, we are splitting by
      // empty tags as well. However, we keep the empty tags.
      var segments = Arrays.splitbyAdv(extractions, function (item) {
        return TypedItem.cata(item, function () {
          return Splitting.excludeWithout(item);
        }, function () {
          return Splitting.excludeWith(item);
        }, function () {
          return Splitting.include(item);
        });
      });

      return Arr.filter(segments, function (x) { return x.length > 0; });
    };

    return {
      group: group
    };

  }
);