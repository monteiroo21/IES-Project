import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import userIcon from "../assets/images/icons/marker-icon.png";

export class MapWidget {
  private map: L.Map;

  constructor(domNode: HTMLElement) {
    this.map = L.map(domNode, {
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      zoomAnimation: false,
      touchZoom: false,
      zoomSnap: 0.1,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this.map);

    this.map.setView([40.63666, -8.65285], 0);
  }

  setZoom(level: number): void {
    this.map.setZoom(level);
  }

  addMarker(lat: number, lng: number, label?: string, id?: number, chainId?: number) {
    const customIcon = L.icon({
      iconUrl: userIcon,
      iconSize: [32, 52], 
      iconAnchor: [16, 50], 
      popupAnchor: [0, -32],
    });
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);

    if (label) {
      if (id && chainId) {
        marker.bindPopup('<a href="/foodChain/'+chainId+'/restaurant/'+id+'">'+label+'</a>').closePopup();
      } else {
        marker.bindPopup(label).closePopup();
      }
    }

  }



  locateUser(): void {
    this.map.locate({ setView: true, maxZoom: 16 });

    this.map.on("locationfound", (e: L.LocationEvent) => {
      // const radius = e.accuracy;

      this.addMarker(e.latlng.lat, e.latlng.lng, "You are there.");

      L.circleMarker([e.latlng.lat, e.latlng.lng], {
        radius: 10,
        color: "red",
        fillColor: "red",
        fillOpacity: 0.4,
        opacity: 0.5,
      }).addTo(this.map);
    });

    this.map.on("locationerror", (e: L.ErrorEvent) => {
      console.error("Erro ao obter localização:", e.message);
    });
  }
}
