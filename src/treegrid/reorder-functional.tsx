import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Reorder, Page, Inject, Column } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ActionEventArgs } from '@syncfusion/ej2-react-grids';
import { sampleData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

function Reorders() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj: TreeGridComponent;
  let dropdownObj: DropDownListComponent;
  let dropdownObj2: DropDownListComponent;

  const columnNames: { [key: string]: Object }[] = [
    { id: 'taskID', name: 'Task ID' },
    { id: 'taskName', name: 'Task Name' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'duration', name: 'Duration' },
    { id: 'progress', name: 'Progress' }
  ];

  const columnsIndex: { [key: string]: Object }[] = [
    { id: '0', name: '1' },
    { id: '1', name: '2' },
    { id: '2', name: '3' },
    { id: '3', name: '4' },
    { id: '4', name: '5' }
  ];

  function change(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    let index: number = treegridObj.getColumnIndexByField(columnName);
    dropdownObj2.value = index.toString();
  }

  function change2(args: ChangeEventArgs): void {
    let columnName: string = dropdownObj.value.toString();
    let toColumnIndex: number = args.value as number;
    let column: Column = treegridObj.columns[toColumnIndex] as Column;
    treegridObj.reorderColumns(columnName, column.field);
  }

  function actionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'reorder') {
      let columnName: string = dropdownObj.value as string;
      let index: number = treegridObj.getColumnIndexByField(columnName);
      dropdownObj2.value = index.toString();
    }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} allowPaging={true} childMapping='subtasks' height='350' allowReordering={true}
            pageSettings={{ pageCount: 4, pageSize: 11 }} ref={treegrid => treegridObj = treegrid}
            actionComplete={actionComplete.bind(this)} >
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='105' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right' />
            </ColumnsDirective>
            <Inject services={[Page, Reorder]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div style={{ paddingTop: '10px' }}> Column </div>
                </td>
                <td style={{ width: '70%', paddingRight: '10px' }}>
                  <div>
                    <DropDownListComponent width="100px" id="columns" change={change.bind(this)}
                      dataSource={columnNames} fields={{ text: 'name', value: 'id' }} value="taskID"
                      ref={dropdown => dropdownObj = dropdown} />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div> Column Index </div>
                </td>
                <td style={{ width: '70%', paddingRight: '10px' }}>
                  <div>
                    <DropDownListComponent width="100px" id="columnindex" change={change2.bind(this)}
                      dataSource={columnsIndex} fields={{ text: 'name', value: 'id' }} value="0"
                      ref={dropdown => dropdownObj2 = dropdown} />
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>This sample demonstrates reordering feature of the Tree Grid columns.You can reorder columns by simply
            drag and drop in the desired column position. You can also reorder columns by simply drag and drop
            in the desired column position.</p>
        </div>
        <div id='description'>
          <p>
            Reordering can be enabled by setting <code>allowReordering</code> property as true. Reordering can be done by drag and drop the
            column header from one index to another index within the Tree Grid.

            The location in which the column to be placed, will be indicated by two arrows symbols
          </p>
          <p>
            In this demo, you can reorder columns by drag and drop.
          </p>
          <p>Injecting Module:</p>
          <p>Tree Grid features are segregated into individual feature-wise modules. To use reordering feature, we need to
            inject <code>Reorder</code> module into the <code>services</code>.</p>
          <p>
            More information about Column Reorder can be found in this documentation section.
          </p>
        </div>
      </div>
    </div>
  )
}
export default Reorders;