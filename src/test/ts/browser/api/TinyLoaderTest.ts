import { Assertions, GeneralSteps, Logger, Pipeline, Step } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import TinyLoader from 'ephox/mcagar/api/TinyLoader';
import TinyUi from 'ephox/mcagar/api/TinyUi';
import { sAssertVersion } from '../../module/AssertVersion';

UnitTest.asynctest('TinyLoaderTest', (success, failure) => {
  var clickedOn = false;

  var sAssertState = (expected, label) => {
    return Step.sync(() => {
      Assertions.assertEq(label, expected, clickedOn);
    });
  };

  var silverSetup = (ed) => {
    ed.ui.registry.addButton('test-button', {
      text: 'test-button',
      onAction: () => clickedOn = true
    });
  };

  var modernSetup = (ed) => {
    ed.addButton('test-button', {
      text: 'test-button',
      icon: false,
      onclick: () => clickedOn = true
    });
  };

  var sTestVersion = (version: string, major, minor, setup) => {
    return TinyLoader.sSetupVersion(version, [], (editor) => {
      var ui = TinyUi(editor);
      clickedOn = false;
      return GeneralSteps.sequence([
        sAssertVersion(major, minor),
        sAssertState(false, 'Expected clickedOn to be false, because'),
        Logger.t(
          'Trying to click on custom button.\nNote, if the button could not be found, it is likely that the setup function has not triggered\n',
          ui.sClickOnToolbar('Click on the test-button to trigger its action', 'button:contains("test-button")')
        ),
        sAssertState(true, 'Expected clickedOn to be true, because the button action sets it to be.')
      ]);
    }, {
      setup,
      toolbar: 'test-button'
    });
  };

  Pipeline.async({}, [
    sTestVersion('4.5.x', 4, 5, modernSetup),
    sTestVersion('4.8.x', 4, 8, modernSetup),
    sTestVersion('5.0.x', 5, 0, silverSetup)
  ], () => success(), failure);
});
