/**
 * Zooming sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Zoom, Legend,
    ProjectionType
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { SliderComponent, Slider, SliderChangeEventArgs } from '@syncfusion/ej2-react-inputs';
import * as data from './map-data/zooming-datasource.json';
let datasource: any = data as any;

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .slider-content-wrapper {
        width: 40%;
        margin: 0 auto;
        min-width: 185px;
    }

    .slider-userselect {
        -webkit-user-select: none;
        /* Safari 3.1+ */
        -moz-user-select: none;
        /* Firefox 2+ */
        -ms-user-select: none;
        /* IE 10+ */
        user-select: none;
        /* Standard syntax */
    }

    .slider-labeltext {
        text-align: -webkit-left;
        font-weight: 500;
        font-size: 13px;
        padding-bottom: 10px;
    }

    .slider_container {
        margin-top: 40px;
    }

    .e-bigger .slider-content-wrapper {
        width: 80%;
    }

    #height_slider .e-tab-handle::after {
        background-color: #f9920b;
    }

    #height_slider.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 0;
    }
    .highcontrast #height_slider.e-control.e-slider .e-slider-track {
        height: 10px;
        top: calc(50% - 5px);
        border-radius: 0;
    }
    .fabric .slider_container .e-slider-hover .e-slider-track, .fabric .slider_container .e-slider-container:active .e-slider-track,
    .fabric .slider_container .e-slider-container .e-slider .e-tab-track{
        background-color: #c8c8c8;
    }

    #gradient_slider.e-control.e-slider .e-range {
        height: 6px;
        top: calc(50% - 3px);
        border-radius: 5px;
        background: linear-gradient(to top left, #f9f9f9 25%, #f9920b 90%);
    }

    .fabric .slider_container .e-slider-hover .e-slider-track,
    .fabric .slider_container .e-slider-container:active .e-slider-track,
    .fabric .slider_container .e-slider-container .e-slider .e-tab-track {
        background-color: #c8c8c8;
    }

    #gradient_slider.e-control.e-slider .e-slider-track {
        height: 8px;
        top: calc(50% - 4px);
        border-radius: 5px;
    }

    #range > * {
        padding: 0px !important;
    }`;

const slidercss = `  
    .content-wrapper {
        width: 40%;
        margin: 0 auto;
        min-width: 100px;
    }`;

function ZoomingMaps() {

    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let mapInstance: MapsComponent;
    let animationElement: SliderComponent;

    function sliderchange(args: SliderChangeEventArgs): void {
        mapInstance.zoomModule.toolBarZooming(args.value as number, 'ZoomIn');
    }

    function onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };

    function load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast')) as MapsTheme;
        // custom code end
    };

    function mousewheel(): void {
        let element: HTMLInputElement = (document.getElementById('mousewheel')) as HTMLInputElement;
        mapInstance.zoomSettings.mouseWheelZoom = element.checked;
        mapInstance.refresh();
    }

    function pinching(): void {
        let element: HTMLInputElement = (document.getElementById('pinch')) as HTMLInputElement;
        mapInstance.zoomSettings.pinchZooming = element.checked;
        mapInstance.refresh();
    }

    function zooming(): void {
        let element: HTMLInputElement = (document.getElementById('zoom')) as HTMLInputElement;
        mapInstance.zoomSettings.enable = element.checked;
        mapInstance.refresh();
    }

    function panning(): void {
        let element: HTMLInputElement = (document.getElementById('panning')) as HTMLInputElement;
        mapInstance.zoomSettings.enablePanning = element.checked;
        mapInstance.refresh();
    }

    function doubletab(): void {
        let element: HTMLInputElement = (document.getElementById('doubletap')) as HTMLInputElement;
        mapInstance.zoomSettings.doubleClickZoom = element.checked;
        let ele1: HTMLInputElement = document.getElementById('singletap') as HTMLInputElement;
        if (element.checked) {
            ele1.disabled = true;
        } else {
            ele1.disabled = false;
        }
        mapInstance.refresh();
    }

    function singletap(): void {
        let element: HTMLInputElement = (document.getElementById('singletap')) as HTMLInputElement;
        let ele1: HTMLInputElement = document.getElementById('doubletap') as HTMLInputElement;
        mapInstance.zoomSettings.zoomOnClick = element.checked;
        if (element.checked) {
            ele1.disabled = true;
        } else {
            ele1.disabled = false;
        }
        mapInstance.refresh();
    }

    function animationChange() {
        mapInstance.layers[0].animationDuration = parseInt(animationElement.value.toString(), 10);
        mapInstance.refresh();
        document.getElementById('range1').innerHTML = (parseInt(animationElement.value.toString(), 10)) + 'ms';
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    {/* <SliderComponent id='height_slider' value={1} min={1} max={10} step={0.1} showButtons={true} tooltip={{
                            isVisible: true, placement: 'before', showOn: 'focus'
                        }} change={sliderchange.bind(this)}
                        >
                        </SliderComponent> */}
                    <MapsComponent id="maps" loaded={onMapsLoad.bind(this)} load={load} ref={m => mapInstance = m}
                        zoomSettings={{
                            enable: true,
                            pinchZooming: true,
                            toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
                        }}
                    >
                        <Inject services={[Zoom]} />
                        <LayersDirective>
                            <LayerDirective shapeData={new MapAjax('./src/maps/map-data/world-map.json')}
                                shapePropertyPath='continent'
                                shapeDataPath='continent'
                                dataSource={datasource}
                                animationDuration={500}
                                shapeSettings={{
                                    autofill: true,
                                    colorValuePath: 'color'
                                }}
                            >
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: '-10px' }}>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Zooming</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={zooming.bind(this)} defaultChecked={true} id="zoom" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Panning</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={panning.bind(this)} defaultChecked={true} id="panning" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Mouse wheel zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={mousewheel.bind(this)} defaultChecked={true} id="mousewheel" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Pinch zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={pinching.bind(this)} defaultChecked={true} id="pinch" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Single click zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={singletap.bind(this)} id="singletap" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Double click zoom</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div style={{ marginTop: "2px" }}>
                                        <input type="checkbox" onClick={doubletab.bind(this)} id="doubletap" style={{ marginLeft: '0px' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div style={{ marginTop: '-15px' }}>Animation Duration </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div className="content-wrapper" style={{ paddingLeft: '0px', marginTop: '-20px' }}>
                                        {/* <style> {slidercss} </style> */}
                                        <SliderComponent id="range" change={animationChange.bind(this)} ref={(slider) => animationElement = slider} name="animationRange" step={250} value={500} min={0} max={1000} width={'70%'} />
                                    </div>
                                </td>
                                <td style={{ width: '10%' }}>
                                    <div style={{ textAlign: 'center', paddingLeft: '0px', marginTop: '-20px', marginLeft: '-20px' }}>
                                        <span id='range1'>500ms</span>
                                    </div>
                                </td>
                            </tr>

                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample depicts the zooming and panning options in the maps. You can customize these options by changing the Zooming, Panning, Mouse wheel zoom, Pinch zoom, Single-click zoom, and Double-click zoom in the Properties panel.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to zoom and pan the map. The support has been provided for zooming with the toolbar, rectangle zoom, pinch zoom, mouse wheel zoom, single-click, and double-click zoom.Panning can be enabled or disabled using
                    the Panning option. When it is disabled, the map will switch to zooming mode.
                </p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use the zooming feature, inject the <code>zoom</code> module using the Maps.Inject(zoom) method.
                </p>
            </div>
        </div>
    )
}
export default ZoomingMaps;