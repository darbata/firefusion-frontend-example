import ReconnectingWebSocket from "reconnecting-websocket";
import type {LatLngExpression} from "leaflet";
import {useEffect, useState} from "react";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const firefusionApi = "localhost:80/api"
const center: LatLngExpression = [-37.8136, 144.9631]; // Melbourne :)

const initial = JSON.parse(`
    {"features": [{"geometry": {"coordinates": [1.6432, -19.123], "type": "Point"}, "id": null, "properties": {}, "type": "Feature"}, {"geometry": {"coordinates": [-80.234, -22.532], "type": "Point"}, "id": null, "properties": {}, "type": "Feature"}], "type": "FeatureCollection"}
`)

export function App() {

    const [features, setFeatures] = useState(initial);
    const [key, setKey] = useState(0); // change key to force refresh

    useEffect(() => {
        const ws = new ReconnectingWebSocket("ws://" + firefusionApi + "/ws");
        ws.onopen = async () => {
            console.log("Websocket connection established");
            const res = await fetch("http://" + firefusionApi + "/bushfire-forecast")
            const recent = await res.json()
            console.log(recent)
            setFeatures(recent)
            setKey((k) => k + 1);
        };
        ws.onmessage = (e) => {
            console.log(e.data)
            setFeatures(JSON.parse(e.data))
            setKey((k) => k + 1);
        };
        return () => {
            ws.close();
            console.log("Websocket connection lost");
        };
    }, []);

    return (
        <div>
            <MapContainer center={center} zoom={2} style={{ height: '100vh' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON key={key} data={features} />
            </MapContainer>
        </div>
    )
}