import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Aggregate,
  AggregatesDirective, AggregateDirective, AggregateColumnDirective, AggregateColumnsDirective
} from '@syncfusion/ej2-react-treegrid';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { summaryRowData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

function AggregateRow() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let treegridObj: TreeGridComponent;

  function footerSum(props): any {
    return (<span>Minimum: {props.Min}</span>)
  }

  function footerSum2(props): any {
    return (<span>Maximum: {props.Max}</span>)
  }

  function onChange(args: ChangeEventArgs): void {
    if (args.checked) {
      treegridObj.aggregates[0].showChildSummary = true;
      treegridObj.refresh();
    } else {
      treegridObj.aggregates[0].showChildSummary = false;
      treegridObj.refresh();
    }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <TreeGridComponent dataSource={summaryRowData} treeColumnIndex={0} childMapping='children' height='410'
            ref={treegrid => treegridObj = treegrid}>
            <ColumnsDirective>
              <ColumnDirective field='FreightID' headerText='Freight ID' width='150'></ColumnDirective>
              <ColumnDirective field='FreightName' headerText='Freight Name' width='190'></ColumnDirective>
              <ColumnDirective field='TotalUnits' headerText='Total Units' width='160' textAlign='Right' />
              <ColumnDirective field='UnitWeight' headerText='Weight Per Unit' width='130' textAlign='Right' />
            </ColumnsDirective>
            <AggregatesDirective>
              <AggregateDirective>
                <AggregateColumnsDirective>
                  <AggregateColumnDirective field='TotalUnits' columnName='TotalUnits' type='Min'
                    footerTemplate={footerSum}> </AggregateColumnDirective>
                  <AggregateColumnDirective field='UnitWeight' columnName='UnitWeight' type='Max'
                    footerTemplate={footerSum2}> </AggregateColumnDirective>
                </AggregateColumnsDirective>
              </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Aggregate]} />
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '60%' }}>
                  <div>
                    Show Child Summary
                  </div>
                </td>
                <td style={{ width: '60%' }}>
                  <div>
                    <CheckBoxComponent checked={true} change={onChange.bind(this)} ></CheckBoxComponent>
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates aggregate functionality of the Tree Grid. In this sample, the aggregate value for the columns
          “Total Units” and “Unit Weight” is displayed in column footer and provide an option to show child summary.</p>
      </div>
      <div id='description'>
        <p>The Tree Grid supports aggregates which will be displayed at the footer and every hierarchy level.
          The aggregate configurations can be provided by the <code> aggregates</code> property.</p>
        <p>The built-in aggregates are,</p>
        <ul>
          <li><code>Sum</code></li>
          <li><code>Average</code></li>
          <li><code>Min</code></li>
          <li><code>Max</code></li>
          <li><code>Count</code></li>
          <li><code>TrueCount</code></li>
          <li><code>FalseCount</code></li>
          <li><code>Custom</code> - Requires the <code>customAggregate</code> property to perform aggregation.
            The custom aggregate value can be accessed inside template using the key <code>${'custom'}</code></li>
        </ul>
        <p>
          In this demo, the <code>footerTemplate</code> property is used to display three different aggregates in the Tree Grid footer.
          <ul>
            <li>Showing minimum aggregate for “Total Units” column and the footerTemplate using
              its type name as <code>(${'Min'})</code>.</li>
            <li>Showing average aggregate for “Unit weight column” column and the footerTemplate
              using its type name as <code>(${'Max'})</code>.</li>
          </ul>
        </p>
        <p>The template expression should be provided inside <code>${'...'}</code> the interpolation syntax.</p>
        <p>Injecting Module:</p>
        <p>
          Tree Grid features are segregated into individual feature-wise modules.
          To use aggregate feature, we need to inject <code>Aggregate</code> module into the services.
        </p>
        <p> More information about aggregate can be found in this documentation section.</p>
      </div>
    </div>
  )
}
export default AggregateRow;