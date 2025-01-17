import * as React from "react";
import * as ReactDOM from "react-dom";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, ITooltipEventArgs } from '@syncfusion/ej2-react-heatmap';
import * as data from './legend-sample-data.json';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// custom code start
const SAMPLE_CSS: any = `
#control-container {
    padding: 0px !important;
}`;
// custom code end
/**
 * Schedule Default sample
 */
function LegendPlacement() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let heatmap: HeatMapComponent;
    let dropElement: DropDownListComponent;
    let droplist: { [key: string]: Object }[] = [
        { value: 'Left' },
        { value: 'Right' },
        { value: 'Top' },
        { value: 'Bottom' }
    ];
    function change(e: Event): void {
        let type: any = document.getElementById('LegendPosition');
        heatmap.legendSettings.position = type.value;
        heatmap.refresh();
    }

    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as HeatMapTheme;
    };

    function legendTooltip(args: ITooltipEventArgs): void {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + '\xB0 C'];
    };

    return (
        <div>
            <div className='col-md-9 control-section'>
                {/* custom code start */}
                <style>
                    {SAMPLE_CSS}
                </style>
                {/* custom code end */}
                <HeatMapComponent id='heatmap-container' ref={t => heatmap = t}
                    titleSettings={{
                        text: 'Hourly Weather Forecast',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }}
                    xAxis={{
                        labels: ['London', 'Berlin', 'Madrid', 'Paris', 'Rome', 'Lisbon', 'Dublin']
                    }}
                    yAxis={{
                        labels: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM',
                            '2PM', '4PM', '6PM', '8PM', '10PM']
                    }}
                    dataSource={(data as any).legentSampleData}
                    cellSettings={{
                        showLabel: false,
                        format: '{value} C'
                    }}
                    tooltipRender={legendTooltip}
                    paletteSettings={{
                        palette: [{ value: 0, color: '#6EB5D0' },
                        { value: 10, color: '#7EDCA2' },
                        { value: 19, color: '#DCD57E' },
                        { value: 22, color: '#DCD57E' }
                        ]
                    }}
                    load={load.bind(this)}
                    legendSettings={{
                        position: 'Bottom',
                        labelFormat: '{value}\xB0 C',
                        title: {
                            text: "Celsius"
                        }
                    }}>
                    <Inject services={[Legend, Tooltip]} />
                </HeatMapComponent>
            </div>
            <div className="col-md-3 property-section">
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Legend Position:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="LegendPosition" change={change.bind(this)}
                                            ref={d => dropElement = d} dataSource={droplist}
                                            fields={{ text: 'value', value: 'value' }} text="Bottom" value="Bottom" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the hourly weather forecast for some major European cities. The data label is disabled in
                    this sample, the tooltip displays the data point values.  In property panel, the options are available to change the
                    display position of the Heatmap legend axes by means of dropdown.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to change the display position of the Heatmap legend. You can change the display
                    position of legend to left, right, bottom and top by using the <code>position </code> property in <code>
                        legendSettings</code>.
                </p>
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in
                    touch enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Heatmap component features are segregated into individual feature-wise modules. To use a tooltip,
                    inject the <code>Tooltip </code>  module using the <code>Heatmap.Inject(Tooltip) </code> method, and use a
                    legend by injecting the <code>Legend </code>  module using the <code>Heatmap.Inject(Legend) </code>  method.
                </p>
            </div>
        </div >
    );
}
export default LegendPlacement;
