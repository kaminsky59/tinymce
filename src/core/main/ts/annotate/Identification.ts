import { Arr, Option } from '@ephox/katamari';
import { Attr, Class, Compare, Element, Node, SelectorFilter, SelectorFind, Traverse } from '@ephox/sugar';

import * as Markings from './Markings';

// import * as Markings from '../style/Markings';

// Given the current editor selection, identify the uid of any current
// annotation
const identify = (editor): Option<string> => {
  const rng = editor.selection.getRng();

  const start = Element.fromDom(rng.startContainer);
  const root = Element.fromDom(editor.getBody());

  const newStart = Traverse.child(start, rng.startOffset).getOr(start);
  const closest = SelectorFind.closest(newStart, '.' + Markings.annotation(), (n) => {
    return Compare.eq(n, root);
  });

  return closest.bind((c) => {
    return Attr.has(c, 'data-uid') ? Option.some(Attr.get(c, 'data-uid')) : Option.none();
  });
};

const isAnnotation = (elem) => {
  return Node.isElement(elem) && Class.has(elem, Markings.annotation());
};

// Update the 'mce-active-annotation' to only be on an annotation that is
// currently selected
const updateActive = (editor: any, optActiveUid: Option<string>) => {
  const allMarkers = SelectorFilter.descendants(
    Element.fromDom(editor.getBody()),
    '.' + Markings.annotation()
  );

  Arr.each(allMarkers, (m) => {
    const isCurrent = optActiveUid.exists((uid) => Attr.get(m, 'data-uid') === uid);
    const f = isCurrent ? Class.add : Class.remove;
    f(m, Markings.activeAnnotation());
  });
};

const findMarkers = (editor, uid) => {
  const body = Element.fromDom(editor.getBody());
  return SelectorFilter.descendants(body, `[data-uid="${uid}"]`);
};

export {
  identify,
  isAnnotation,
  updateActive,
  findMarkers
};