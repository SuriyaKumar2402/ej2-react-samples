import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, HolidaysDirective, HolidayDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

function Holidays() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const projectStartDate: Date = new Date('03/24/2019');
  const projectEndDate: Date = new Date('07/06/2019');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Holidays' dataSource={projectNewData} highlightWeekends={true} treeColumnIndex={1}
          taskFields={taskFields} labelSettings={labelSettings} height='410px'
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
          </ColumnsDirective>
          <HolidaysDirective>
            <HolidayDirective from='04/04/2019' to='04/04/2019' label='Local Holiday'></HolidayDirective>
            <HolidayDirective from='04/19/2019' to='04/19/2019' label='Good Friday'></HolidayDirective>
            <HolidayDirective from='04/30/2019' to='04/30/2019' label='Release Holiday'></HolidayDirective>
          </HolidaysDirective>
          <Inject services={[Selection, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes how to define the holidays in between the project timeline. </p>
      </div>

      <div id="description">
        <p>
          In this example,<code> holidays </code> are displayed with vertical bar with the desired text using the <code>label</code> property. You can also mention the continuous holidays by specifying the <code>from</code> and <code>to</code> range. For single holiday, you can define from value alone. Holidays are defined as an array of object collection, so that we can display more than one holiday in the project.
        </p>
        <p>
          You can even assign the <code>cssClass</code> to each holiday to change the default color of label and background.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
          <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
      </div>
    </div>
  )
}

export default Holidays;
