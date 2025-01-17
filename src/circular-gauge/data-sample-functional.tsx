/**
 * Sample to show communication between Grid and Circular Gauge
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, ILoadedEventArgs,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
    Annotations, AnnotationDirective, AnnotationsDirective, GaugeTheme,
} from '@syncfusion/ej2-react-circulargauge';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .imageStyle {
        width: 16px;
        height: 16px;
        margin-top: 4px;
    }
        
    .fontDes {
        float: right;
        padding-left: 5px;
        color:#424242;
        font-size:20px;
        font-family:inherit";
    }
    .fontDes1 {
        color:#9E9E9E;
        font-size:16px;
        font-family: inherit";
    }
    `;

function SampleData() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let dataGrid: GridComponent;
    let sampleGaugeOne: CircularGaugeComponent;
    let sampleGaugeTwo: CircularGaugeComponent;
    let sampleGaugeThree: CircularGaugeComponent;
    let dataIntervalOne: Object;
    let dataIntervalTwo: Object;

    let orderData: Object[] = [
        {
            'Country': 'Germany',
            'Sales': 500,
            'Target': 400,
            'vsTarget': 300
        }, {
            'Country': 'USA',
            'Sales': 1000,
            'Target': 600,
            'vsTarget': 360
        }, {
            'Country': 'UK',
            'Sales': 600,
            'Target': 700,
            'vsTarget': -100
        }
    ];

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as GaugeTheme;
        // custom code end
    }

    function onChartLoad(args: ILoadedEventArgs): void {
        dataIntervalOne = setInterval(
            (): void => {
                let randomValue: number = Math.random();
                let value1: number = Math.round((randomValue * 35) + 55);
                let value2: number = Math.round((randomValue * 15) + 60);
                let value3: number = Math.round((randomValue * 30) + 10);
                let gridData1: number = 4 * value1;
                let gridData2: number = 6 * value2;
                let gridData3: number = -7 * value3;
                let newVal: number = Math.random() * (90 - 20) + 20;
                if (document.getElementById('sample1-container') && sampleGaugeOne != null) {
                    sampleGaugeOne.axes[0].pointers[0].animation.enable = true;
                    sampleGaugeTwo.axes[0].pointers[0].animation.enable = true;
                    sampleGaugeThree.axes[0].pointers[0].animation.enable = true;
                    sampleGaugeOne.setPointerValue(0, 0, value1);
                    sampleGaugeTwo.setPointerValue(0, 0, value2);
                    sampleGaugeThree.setPointerValue(0, 0, -value3);
                    sampleGaugeOne.setAnnotationValue(0, 0, sampleGaugeOne.axes[0].annotations[0].content);
                    sampleGaugeTwo.setAnnotationValue(0, 0, sampleGaugeTwo.axes[0].annotations[0].content);
                    sampleGaugeThree.setAnnotationValue(0, 0, sampleGaugeThree.axes[0].annotations[0].content);
                    orderData = [
                        {
                            'Country': 'Germany',
                            'Sales': 500,
                            'Target': 400,
                            'vsTarget': gridData1
                        }, {
                            'Country': 'USA',
                            'Sales': 1000,
                            'Target': 600,
                            'vsTarget': gridData2
                        }, {
                            'Country': 'UK',
                            'Sales': 600,
                            'Target': 700,
                            'vsTarget': gridData3
                        }];
                } else {
                    clearInterval(+dataIntervalOne);
                }
            },
            2000
        );
    };

    function onGridLoad(args: {}): void {
        dataIntervalTwo = setInterval(
            (): void => {
                if (document.getElementById('sample1-container') && dataGrid != null) {
                    dataGrid.dataSource = orderData;
                    dataGrid.refresh()
                } else {
                    clearInterval(+dataIntervalTwo);
                }
            }, 2000)
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} background='transparent' ref={gauge => sampleGaugeOne = gauge} id='sample1-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={230} endAngle={130} minimum={-100} maximum={100}
                                            lineStyle={{
                                                width: 0,
                                                color: 'transparent'
                                            }}
                                            majorTicks={{
                                                width: 0,
                                                height: 0
                                            }}
                                            minorTicks={{
                                                width: 0,
                                                height: 0
                                            }} labelStyle={{
                                                position: 'Outside',
                                                font: { size: '0', color: 'transparent' }
                                            }}>
                                            <AnnotationsDirective>
                                                <AnnotationDirective
                                                    content='<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for Germany"/><div class="fontDes">${pointers[0].value}%</div></div></div>'
                                                    angle={180} zIndex='1'
                                                    radius='30%' />
                                                <AnnotationDirective
                                                    content='<div class="fontDes1">Germany</div>'
                                                    angle={180} zIndex='1'
                                                    radius='65%' />
                                            </AnnotationsDirective>
                                            <RangesDirective>
                                                <RangeDirective start={-100} end={0} startWidth={15} endWidth={15} color='#EC121C' />
                                                <RangeDirective start={0} end={100} startWidth={15} endWidth={15} color='#45EA0C' />
                                            </RangesDirective>
                                            <PointersDirective>
                                                <PointerDirective value={75} radius='60%' color='#777777'
                                                    animation={{ enable: false, duration: 900 }}
                                                    pointerWidth={5}
                                                    cap={{
                                                        radius: 6, color: '#777777',
                                                        border: { width: 0 }
                                                    }}
                                                    needleTail={{
                                                        length: '25%', color: '#777777'
                                                    }}>
                                                </PointerDirective>
                                            </PointersDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} background='transparent' ref={gauge => sampleGaugeTwo = gauge} id='sample2-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={230} endAngle={130} minimum={-100} maximum={100}
                                            lineStyle={{
                                                width: 0,
                                                color: 'transparent'
                                            }}
                                            majorTicks={{
                                                width: 0,
                                                height: 0
                                            }}
                                            minorTicks={{
                                                width: 0,
                                                height: 0
                                            }} labelStyle={{
                                                position: 'Outside',
                                                font: { size: '0', color: 'transprent' }
                                            }}>
                                            <AnnotationsDirective>
                                                <AnnotationDirective
                                                    content='<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for USA" /><div class="fontDes">${pointers[0].value}%</div></div></div>'
                                                    angle={180} zIndex='1'
                                                    radius='30%' />
                                                <AnnotationDirective
                                                    content='<div class="fontDes1">USA</div>'
                                                    angle={180} zIndex='1'
                                                    radius='65%' />
                                            </AnnotationsDirective>
                                            <RangesDirective>
                                                <RangeDirective start={-100} end={0} startWidth={15} endWidth={15} color='#EC121C' />
                                                <RangeDirective start={0} end={100} startWidth={15} endWidth={15} color='#45EA0C' />
                                            </RangesDirective>
                                            <PointersDirective>
                                                <PointerDirective value={60} radius='60%' color='#777777'
                                                    animation={{ enable: false, duration: 900 }}
                                                    pointerWidth={5}
                                                    cap={{
                                                        radius: 6, color: '#777777',
                                                        border: { width: 0 }
                                                    }}
                                                    needleTail={{
                                                        length: '25%', color: '#777777'
                                                    }}>
                                                </PointerDirective>
                                            </PointersDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                            <div className="col-sm-4">
                                <CircularGaugeComponent load={load.bind(this)} style={{ height: "250px" }} background='transparent' ref={gauge => sampleGaugeThree = gauge} loaded={onChartLoad.bind(this)} id='sample3-container'>
                                    <Inject services={[Annotations]} />
                                    <AxesDirective>
                                        <AxisDirective startAngle={230} endAngle={130} minimum={-100} maximum={100}
                                            lineStyle={{
                                                width: 0,
                                                color: 'transparent'
                                            }}
                                            majorTicks={{
                                                width: 0,
                                                height: 0
                                            }}
                                            minorTicks={{
                                                width: 0,
                                                height: 0
                                            }} labelStyle={{
                                                position: 'Outside',
                                                font: { size: '0', color: 'transparent' }
                                            }}>
                                            <AnnotationsDirective>
                                                <AnnotationDirective
                                                    content='<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/negative.png" alt="Negative value for UK" /><div class="fontDes">${pointers[0].value}%</div></div></div>'
                                                    angle={180} zIndex='1'
                                                    radius='30%' />
                                                <AnnotationDirective
                                                    content='<div class="fontDes1">UK</div>'
                                                    angle={180} zIndex='1'
                                                    radius='65%' />
                                            </AnnotationsDirective>
                                            <RangesDirective>
                                                <RangeDirective start={-100} end={0} startWidth={15} endWidth={15} color='#EC121C' />
                                                <RangeDirective start={0} end={100} startWidth={15} endWidth={15} color='#45EA0C' />
                                            </RangesDirective>
                                            <PointersDirective>
                                                <PointerDirective value={25} radius='60%' color='#777777'
                                                    animation={{ enable: false, duration: 900 }}
                                                    pointerWidth={5}
                                                    cap={{
                                                        radius: 6, color: '#777777',
                                                        border: { width: 0 }
                                                    }}
                                                    needleTail={{
                                                        length: '25%', color: '#777777'
                                                    }}>
                                                </PointerDirective>
                                            </PointersDirective>
                                        </AxisDirective>
                                    </AxesDirective>
                                </CircularGaugeComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <GridComponent dataBound={onGridLoad.bind(this)} ref={grid => dataGrid = grid} dataSource={orderData.slice(0, 30)}>
                                <ColumnsDirective>
                                    <ColumnDirective field='Country' headerText='Country' width='80'></ColumnDirective>
                                    <ColumnDirective field='Sales' headerText='Sales $' width='80'></ColumnDirective>
                                    <ColumnDirective field='Target' headerText='Target $' width='80' />
                                    <ColumnDirective field='vsTarget' headerText='vs Target' width='80' />
                                </ColumnsDirective>
                            </GridComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample shows live stock price data displayed in multiple circular gauges.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The pointer value in the circular gauge can be dynamically updated using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#setpointervalue">setPointerValue</a> method. In this example, the stock price changes across countries are displayed in multiple circular gauges.
                    </p>
                    <p>
                        More information on the circular gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default SampleData;
