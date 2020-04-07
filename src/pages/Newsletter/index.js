import React from 'react';
import {
  List as ListComp,
  Show as ShowComp,
  Datagrid,
  TextField,
  SimpleShowLayout,
  TextInput,
  SimpleForm,
  required,
  RichTextField,
  DateField,
} from 'react-admin';
import Quill from 'quill';

import { SectionTitle } from '../helpers';
import { CreateComponent } from 'Components/CreateForm';
import RichTextInput from 'ra-input-rich-text';

export const List = (props) => {
  return (
    <ListComp exporter={false} {...props}>
      <Datagrid rowClick="show">
        <TextField source="topic" />
        <RichTextField source="content" />
        <DateField source="date" label="Date sent" locales="lt-LT" />
      </Datagrid>
    </ListComp>
  );
};

export const Show = (props) => {
  return (
    <ShowComp title={<SectionTitle action="Newsletter" />} {...props}>
      <SimpleShowLayout>
        <TextField source="topic" />
        <RichTextField source="content" />
        <DateField source="date" label="Date sent" locales="lt-LT" />
      </SimpleShowLayout>
    </ShowComp>
  );
};

export const Create = (props) => {
  var DirectionAttribute = Quill.import('attributors/attribute/direction');
  Quill.register(DirectionAttribute, true);

  var AlignClass = Quill.import('attributors/class/align');
  Quill.register(AlignClass, true);

  var BackgroundClass = Quill.import('attributors/class/background');
  Quill.register(BackgroundClass, true);

  var ColorClass = Quill.import('attributors/class/color');
  Quill.register(ColorClass, true);

  var DirectionClass = Quill.import('attributors/class/direction');
  Quill.register(DirectionClass, true);

  var FontClass = Quill.import('attributors/class/font');
  Quill.register(FontClass, true);

  var SizeClass = Quill.import('attributors/class/size');
  Quill.register(SizeClass, true);

  var AlignStyle = Quill.import('attributors/style/align');
  Quill.register(AlignStyle, true);

  var BackgroundStyle = Quill.import('attributors/style/background');
  Quill.register(BackgroundStyle, true);

  var ColorStyle = Quill.import('attributors/style/color');
  Quill.register(ColorStyle, true);

  var DirectionStyle = Quill.import('attributors/style/direction');
  Quill.register(DirectionStyle, true);

  var FontStyle = Quill.import('attributors/style/font');
  Quill.register(FontStyle, true);

  var SizeStyle = Quill.import('attributors/style/size');
  Quill.register(SizeStyle, true);

  const toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ header: [1, 2, 3, 4, 5] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
  ];

  return (
    <CreateComponent props={props} redirect="list">
      <SimpleForm redirect="show">
        <TextInput source="topic" validate={required()} />
        <RichTextInput source="content" validate={required()} toolbar={toolbar} />
      </SimpleForm>
    </CreateComponent>
  );
};
