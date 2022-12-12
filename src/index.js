import './style/main.css'

// import * as dat from 'dat.gui'
import Loader from './loader'
import { CanvasDriver, Engine, GameObject, Input, MasterAudio, StageScaleMode } from 'black-engine'
import Game from './game'

// const gui = new dat.GUI()

const engine = new Engine('container', GameObject, CanvasDriver, [Input, MasterAudio]);
engine.pauseOnBlur = false;
engine.pauseOnHide = true;
engine.viewport.isTransperent = false;
engine.start();

engine.stage.setSize(640, 960);
engine.stage.scaleMode = StageScaleMode.LETTERBOX;

const loader = new Loader();
loader.events.on('onLoaded', () => {
  new Game();
});



showFPSMeter();

function showFPSMeter() {
  (function () {
    var script = document.createElement('script');
    script.onload = function () {
      var stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
    document.head.appendChild(script);
  })();
};