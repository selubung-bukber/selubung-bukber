// countDown.js

export class CustomCountdown extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.endTime = this.getAttribute('end-time')
    this.eventDate = new Date(this.endTime).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    this.dateLabel = this.getAttribute('date-label') || 'End Date:'
    this.timerElement = null
    this.dateElement = null
  }

  connectedCallback() {
    this.render()
    this.initialize()
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = `
            <style>

            .card {
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                display: grid;
                place-items: center;
            }

            .card .date {
                margin-bottom: 10px;
                background: aliceblue;
                padding: 0 2em;
                border-radius: 1em 1em 0 0;
                font-family: 'Tahoma';
                
            }

            .card .timer {
              font-weight: bolder;
              color: darkslategray;
              display: flex;
              column-gap: 1em;
          }

          .timer div{
            color:green;
            line-height:3;
          }

            .card .event-date{
                background:green;
                font-size:30pt;
                padding:0 1.8em;
                border-radius:0 0 1em 1em;
                color:aliceblue;
                font-weight:bold;
                
            }



                .card .timer div {
                    display: inline-block;
                    min-width: 70px;
                }

                .card .timer span {
                    color: red;
                    font-size: 1.5em;
                    font-weight: bolder;
                    font-style: italic;
                    padding-left: 1em;
                }

                @media (min-width:320px)and (max-width:481px){
                  img{
                    scale:;
                  }

                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                }

                .card .date {
                  font-family: system-ui;
                  line-height: 2;
                  padding:0;
                  border-radius:1em 1em 0 0;
              }

                 .card .event-date {
                   font-size: 20pt;
                   padding: 0;
                   border-radius: 0 0 1em 1em;
               }
            
             .card .timer {
              flex-direction: column;
              flex-wrap: wrap;
              align-items: flex-start;
              align-content: space-around;
              border: solid green;
              margin: 1em 0;
              border-radius: 1em;
          }

             @media (min-width:481px)and(max-width:786px){



            }

            @media (min-width:769px)and(max-width:1024px){
              details img[alt="kribo"] {
                  left: 15em;
              }

              @media (min-width:1025px)and(max-width:1200px){
                

              }

                }
            </style>
            <div class="card">
<img src="https://res.cloudinary.com/de2gwxhf6/image/upload/v1710700203/meme-bocah/biksu_dua_ujuwvq.png" alt="">


                <div class="date">${
                  this.dateLabel
                } ${this.getFormattedCurrentDate()}</div>
                <div class="event-date">Acara : ${this.eventDate}</div>
                <div class="timer" id="timer"></div>
            </div>
        `
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.timerElement = this.shadowRoot.getElementById('timer')
  }

  initialize() {
    this.update()
    this.interval = setInterval(() => {
      this.update()
    }, 1000)
  }

  update() {
    const now = new Date()
    const future = new Date(this.endTime)
    const diff = future - now

    if (diff <= 0) {
      clearInterval(this.interval)
      this.timerElement.textContent = 'Countdown finished'
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    this.timerElement.innerHTML = `
            <div>${days}<span>hari</span></div>
            <div>${hours}<span>jam</span></div>
            <div>${minutes}<span>menit</span></div>
            <div>${seconds}<span>detik</span></div>
        `
  }

  getFormattedCurrentDate() {
    const now = new Date()
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    return now.toLocaleDateString('id-ID', options)
  }

  disconnectedCallback() {
    clearInterval(this.interval)
  }
}

customElements.define('custom-countdown', CustomCountdown)
