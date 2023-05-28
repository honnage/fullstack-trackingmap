<!-- eslint-disable no-unused-vars -->
<template>
  <div id="map"></div>
</template>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";

export default {
  name: "DashboardPage",
  components: {},
  data() {
    return {
      markers: [],
    };
  },

  mounted() {
    this.initializeMap();
    this.getData();
    setInterval(() => {
      this.removeMarkers();
      this.getData();
    }, 1 * 1000 * 60);
  },

  methods: {
    initializeMap() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic3VnYXJzcGljeTAwOSIsImEiOiJja3JuZWR0aXgxemtjMndwZW5tbjg5MG04In0.iSpsJUrbQiX1Z2OjIiRcFw";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [100.6060742685167, 13.855035407124475],
        zoom: 9,
      });

      this.map.addControl(new mapboxgl.NavigationControl(), "top-left");
    },

    getData() {
      const url = window.location.href;
      const id = url.split("/").pop();
      let currentDate = new Date();
      let formattedDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      let data = [];
      console.log("last time ------>", formattedDate);
      if (id !== "") {
        // axios
        //   .get("/lastTracing", { params: { deviceNumber: id } })
        //   .then((response) => {
        //     data = response.data.data;
        //     console.log("data", data);
        //     this.createMarkers(data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      } else {
        axios
          .get("api/v2/lastTracing", {
            headers: {
              token: localStorage.getItem('user-token'),
            },
          })
          .then((response) => {
            data = response.data.data;
            console.log("=> data", data);
            this.createMarkers(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    createMarkers(data) {
      data.forEach((item, index) => {
        const {
          deviceNumber,
          latitude,
          longitude,
          temperature,
          humidity,
          batteryPercent,
          formattedCreatedAt,
          posmap,
        } = item;

        let colorColor = "";
        switch (index) {
          case 0:
            colorColor = "red";
            break;
          case 1:
            colorColor = "blue";
            break;
          case 2:
            colorColor = "black";
            break;
          case 3:
            colorColor = "orange";
            break;
          case 4:
            colorColor = "green";
            break;
          case 5:
            colorColor = "brown";
            break;
          case 6:
            // eslint-disable-next-line no-unused-vars
            colorColor = "purple";
            break;
        }

        if (posmap == true) {
          let marker = new mapboxgl.Marker({ color: "red", rotation: 0 })
            .setLngLat([longitude, latitude])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
          Device ID:    <span style="float: right; margin-right: 20px;">${deviceNumber}</span><br>
          Latitude:     <span style="float: right; margin-right: 20px;">${latitude}</span><br>
          Longitude:    <span style="float: right; margin-right: 20px;">${longitude}</span><br>
          Temperature:  <span style="float: right; margin-right: 20px;${
            temperature > 40 ? "color: red;" : ""
          }">${temperature} </span><br>
          Humidity:     <span style="float: right; margin-right: 20px;${
            humidity > 40 ? "color: red;" : ""
          }">${humidity} %</span><br>
          Battery:      <span style="float: right; margin-right: 20px;">${batteryPercent} %</span><br>
          Last Time: ${formattedCreatedAt}`)
            )
            .addTo(this.map);
          this.markers.push(marker);
        }
      });
    },

    removeMarkers() {
      this.markers.forEach((marker) => {
        marker.remove();
      });

      this.markers = [];
      console.log(" ");
      // console.log('removeMarkers');
    },
  },
};
</script>

<style scoped>
#map {
  position: absolute;
  /* bottom: 0; */
  top: 60px;
  /* left: 0;
  right: 0; */
  /* margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0; */
  width: 100%;
  height: 100%;
}
</style>
