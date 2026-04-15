# Firefusion Frontend Example

A React + Vite project that uses the output of the FireFusion API (GeoJSON FeatureCollection) to visualise geometry to a map. All related code for websocket connection, fetching data and refreshing on new data can be found.

The backend project can be found here https://github.com/InnovAIte-Deakin/InnovAIte_FireFusion_Project/tree/main/backend.

How to use:
1. Run `docker compose --profile up -d` in the root of the backend project.
2. Run `npm run dev` in the root of this project
3. Open `http://localhost:5173` in browser

Dependencies:
- `react` - handle Component refreshing (when new data is received)
- `reconnecting-websocket` - connecting to websocket endpoint
- `react-leaflet` - for rendering map and GeoJSON features
- `leaflet` - for Typescript types

Example GeoJSON rendering
<img width="871" height="782" alt="image" src="https://github.com/user-attachments/assets/89cf40db-663b-4fca-82ed-07cd71bcda80" />
