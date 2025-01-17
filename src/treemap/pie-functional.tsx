/**
 * Sample for treemap with pie
 */
import * as React from "react";
import {
    AccumulationChart, PieSeries,
    DataLabel, AccumulationTooltip,
} from '@syncfusion/ej2-react-charts';
import {
    TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapTooltip,
    ILoadedEventArgs, IResizeEventArgs, TreeMapTheme, ITreeMapTooltipRenderEventArgs
} from '@syncfusion/ej2-react-treemap';
import { updateSampleSection } from '../common/sample-base';
import * as data from './treemap-data/continent_data.json';
AccumulationChart.Inject(AccumulationTooltip, PieSeries, DataLabel, AccumulationChart);
let datasource: any = data as any;
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
function Pie() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let treemapInstance: TreeMapComponent;
    function load(args: ILoadedEventArgs): void {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = ((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as TreeMapTheme;
        // custom code end
    }

    function loaded(args: ILoadedEventArgs): void {
        let template: Element = document.getElementById(args.treemap.element.id + '_Label_Template_Group');
        if (template) {
            for (let i: number = 0; i < template.childElementCount; i++) {
                AccumulationChartRender((template.childNodes[i].childNodes[0] as Element).id, i);
            }
            let count = 0;
        }
    }

    function resize(args: IResizeEventArgs): void {
        for (let i: number = 0; i < chartCollection.length; i++) {
            chartCollection[i].destroy();
        }
    }

    function tooltipRendering(args: ITreeMapTooltipRenderEventArgs): void {
        //tslint:disable-next-line
        if (args.item['groupIndex'] !== 1) {
            args.cancel = true;
        }
    }

    let chartCollection: AccumulationChart[] = [];
    let count: number = 0;

    function AccumulationChartRender(id: string, i: number): void {
        let chartData: any = getData(i);
        let dataSource: Object[] = chartData['data'];
        let name: string = chartData['name'];
        let chart: AccumulationChart = new AccumulationChart({
            background: 'transparent',
            tooltip: {
                enable: true,
                format: '${point.x} : ${point.y}%'
            },
            series: [
                {
                    explode: true,
                    explodeIndex: 0,
                    explodeOffset: '20%',
                    name: name,
                    palettes: ['#1E1E1E', '#00BDAE', '#FFFFFF'],
                    dataSource: dataSource,
                    type: 'Pie',
                    xName: 'x',
                    yName: 'y'
                }
            ],
            legendSettings: { visible: false }
        });
        chart.appendTo('#' + id);
        chartCollection.push(chart);
    }

    function getData(count: number): Object {
        let dataSource: Object[];
        let dataName: string;
        if (count === 0) {
            dataSource = [
                { 'x': '0-15 years', y: 40.8 }, { 'x': '15-64 years', y: 56.2 },
                { 'x': 'Above 64 years', y: 3.0 }
            ];
            dataName = 'Afica';
        } else if (count === 1) {
            dataSource = [
                { 'x': '0-15 years', y: 15.5 }, { 'x': '15-64 years', y: 12.9 },
                { 'x': 'Above 64 years', y: 41.4 }
            ];
            dataName = 'Asia';
        } else if (count === 2) {
            dataSource = [
                { 'x': '0-15 years', y: 25.1 }, { 'x': '15-64 years', y: 67.8 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'Europe';
        } else if (count === 3) {
            dataSource = [
                { 'x': '0-15 years', y: 15.3 }, { 'x': '15-64 years', y: 68.4 },
                { 'x': 'Above 64 years', y: 16.3 }
            ];
            dataName = 'North America';
        } else if (count === 4) {
            dataSource = [
                { 'x': '0-15 years', y: 22.8 }, { 'x': '15-64 years', y: 65.9 },
                { 'x': 'Above 64 years', y: 11.4 }
            ];
            dataName = 'Oceania';
        } else if (count === 5) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 6) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 7) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 8) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 9) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 10) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 11) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        } else if (count === 12) {
            dataSource = [
                { 'x': '0-15 years', y: 26.8 }, { 'x': '15-64 years', y: 66.1 },
                { 'x': 'Above 64 years', y: 7.1 }
            ];
            dataName = 'South America';
        }
        count++;
        return new Object({ name: dataName, data: dataSource });
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className='col-md-12'>
                    <TreeMapComponent resize={resize.bind(this)} loaded={loaded.bind(this)} tooltipRendering={tooltipRendering.bind(this)} load={load.bind(this)} id='treemap-container'
                        tooltipSettings={{			//To config tooltip for treemap
                            visible: true,
                            format: ' ${Gender} : ${Population}'
                        }}
                        titleSettings={{			//To config title for treemap
                            text: 'Population of the continents based on gender and age group - 2011',
                            textStyle: { size: '15px' }
                        }}
                        format={"n"}
                        useGroupingSeparator={true}
                        dataSource={datasource.continent}
                        weightValuePath='Population'
                        leafItemSettings={{			// To config leafitem customization for treemap
                            labelPath: 'Gender',
                            fill: '#A1317D',
                            showLabels: false,
                            border: { color: 'black', width: 0.5 },
                            labelFormat: '${Gender} : ${Population}',
                            templatePosition: 'Center',
                            labelTemplate: '<div style="height:{{:PieHeight}};width:{{:PieWidth}};" id ={{:Id}}></div>',
                        }}>
                        <Inject services={[TreeMapTooltip]} />
                        <LevelsDirective>
                            <LevelDirective groupPath='Continent' fill='#7E2361' border={{ color: 'black', width: 1 }} headerAlignment='Center' groupGap={0} headerStyle={{ size: '14px' }} />
                        </LevelsDirective>
                    </TreeMapComponent>
                </div>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>Source:
                    <a href="http://en.worldstat.info/Asia/" target="_blank">en.worldstat.info</a>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the population level of various continents in 2011 based on the gender and age group.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render a pie chart as a template for leaf items in TreeMap. Any custom HTML element can be rendered as label template.
                    <br /><br />
                    Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices.
                </p>
            </div>
        </div>
    )
}
export default Pie;
