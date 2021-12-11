const template = document.createElement('template');
template.innerHTML = `
  <style>
    .alarm-tile {
      position: absolute;
      top:0; bottom:0; left:5px; right:5px;
      display: flex;
      flex-direction: column;
    }
    .alarm-tile__zones {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
    }
    .alarm-tile__zones__zone {
      flex-grow: 1;
      margin-right: 5px;
      background-color: rgba(255,255,255,0.2);
      text-align: center;
      position: relative;
    }
    .alarm-tile__zones__zone:last-child {
      margin-right: 0;
    }
    .alarm-tile__zones__zone:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    .alarm-tile__zones__zone div {
      position: absolute;
      top:0; bottom:0; left:0; right:0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6vw;;
    }
    .alarm-tile__flags {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }
    .alarm-tile__flags__row {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      margin-top: 5px;
    }
    .alarm-tile__flags__row__cell {
      flex-grow: 1;
      flex-basis: 100%;
      background-color: rgba(255,255,255,0.2);
      margin-right: 5px;
      text-align: center;
      position: relative;
    }
    .alarm-tile__flags__row__cell:last-child {
      margin-right: 0;
    }
    .alarm-tile__flags__row__cell div {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5vw;
      text-transform: uppercase;
      font-weight: bold;
    }
    .alarm-tile__title {
      align-self: center;
      flex-shrink: 1;
      vertical-align: bottom;
      white-space: nowrap;
      overflow-x: hidden;
    }
    .alarm-tile__active {
      background-color: rgba(255,255,255,0.6);
      color: rgba(0,0,0,0.7);
    }
  </style>
  <div class="alarm-tile">
    <div class="alarm-tile__zones">
      <div class="alarm-tile__zones__zone" id="alarm-tile-z1"><div>1</div></div>
      <div class="alarm-tile__zones__zone" id="alarm-tile-z2"><div>2</div></div>
      <div class="alarm-tile__zones__zone" id="alarm-tile-z3"><div>3</div></div>
      <div class="alarm-tile__zones__zone" id="alarm-tile-z4"><div>4</div></div>
      <div class="alarm-tile__zones__zone" id="alarm-tile-z5"><div>5</div></div>
    </div>
    <div class="alarm-tile__flags">
      <div class="alarm-tile__flags__row">
        <div class="alarm-tile__flags__row__cell" id="alarm-tile-ready"><div>ready</div></div>
        <div class="alarm-tile__flags__row__cell" id="alarm-tile-armed"><div>armed</div></div>
      </div>
      <div class="alarm-tile__flags__row">
        <div class="alarm-tile__flags__row__cell" id="alarm-tile-alarm"><div>alarm</div></div>
        <div class="alarm-tile__flags__row__cell" id="alarm-tile-zone-open"><div>zone open</div></div>
      </div>
      <div class="alarm-tile__flags__row">
        <div class="alarm-tile__flags__row__cell" id="alarm-tile-door-open"><div>door open</div></div>
        <div class="alarm-tile__flags__row__cell" id="alarm-tile-fire"><div>fire</div></div>
      </div>
    </div>
    <div class="alarm-tile__title">
      Alarm system
    </div>
  </div>
`;

class AlarmTile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.states = {};
  }

  static get observedAttributes() {
    return ['z1', 'z2', 'z3', 'z4', 'z5', 'ready', 'armed', 'alarm', 'zone-open', 'door-open', 'fire'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.setFlagState(name, newValue === '1');
  }

  setFlagState(flagId, enabled) {
    const zone = this.shadowRoot.getElementById(`alarm-tile-${flagId}`);

    if ((this.states[flagId] ?? false) === enabled) {
      return;
    }

    if (enabled) {
      this.states[flagId] = true;
      zone.classList.add('alarm-tile__active');
    } else {
      this.states[flagId] = false;
      setTimeout(() => {
        if (this.states[flagId] === false) {
          zone.classList.remove('alarm-tile__active');
        }
      }, 5000);
    }
  }
}

window.customElements.define('alarm-tile', AlarmTile);
