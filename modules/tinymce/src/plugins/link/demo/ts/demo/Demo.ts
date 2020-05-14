declare let tinymce: any;

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'link code',
  toolbar: 'link code',
  menubar: 'view insert tools',
  link_quicklink: true,
  link_list: [
    { title: 'Test', value: 'https://www.tiny.cloud' },
    { title: 'My page 2', value: 'https://about.tiny.cloud' }
  ],
  height: 600,
  setup: (ed) => {
    ed.on('init', () => {
      ed.setContent('<h1>Heading</h1><p><a name="anchor1"></a>anchor here.');
    });

    // ed.on('ExecCommand', (command: any, ui?: boolean, value?: any) => {
    //   switch (command.command) {
    //     case 'openLink':
    //       const inst = command.target;
    //       const linkElm = tinymce.getParentElement(inst.selection.getFocusElement(), 'a');

    //       if (linkElm)
    //         alert('Link dialog has been overriden. Found link href: ' + tinymce.getAttrib(linkElm, 'href'));
    //       else
    //         alert('Link dialog has been overriden.');
    //       return true;
    // }});
  },
});

export {};
