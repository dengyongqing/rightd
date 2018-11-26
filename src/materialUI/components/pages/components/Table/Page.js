import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import tableReadmeText from './README';
import TableExampleSimple from './ExampleSimple';
import tableExampleSimpleCode from '!raw!./ExampleSimple';
import TableExampleComplex from './ExampleComplex';
import tableExampleComplexCode from '!raw!./ExampleComplex';

import tableCode from '!raw!material-ui/Table/Table';
import tableRowCode from '!raw!material-ui/Table/TableRow';
import tableRowColumnCode from '!raw!material-ui/Table/TableRowColumn';
import tableHeaderCode from '!raw!material-ui/Table/TableHeader';
import tableHeaderColumnCode from '!raw!material-ui/Table/TableHeaderColumn';
import tableBodyCode from '!raw!material-ui/Table/TableBody';
import tableFooterCode from '!raw!material-ui/Table/TableFooter';

const descriptions = {
  simple: 'A simple table demonstrating the hierarchy of the `Table` component and its sub-components.',
  complex: 'A more complex example, allowing the table height to be set, and key boolean properties to be toggled.',
};

const TablePage = () => (
  <div>
    <Title render={(previousTitle) => `Table - ${previousTitle}`} />
    <MarkdownElement text={tableReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={tableExampleSimpleCode}
    >
      <TableExampleSimple />
    </CodeExample>
    <CodeExample
      title="Complex example"
      description={descriptions.complex}
      code={tableExampleComplexCode}
    >
      <TableExampleComplex />
    </CodeExample>
  </div>
);

export default TablePage;
