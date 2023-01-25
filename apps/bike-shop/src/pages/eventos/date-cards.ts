import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('date-cards')
export class DateCards extends LitElement {

    @property({ type: Event })
    event: Event

    static override styles = css`
        :host {
            display: block;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(470px, 1fr));
            grid-gap: 16px;
        }        

        .date-card {
            margin-top: 16px;
            margin-bottom: 16px;
            transition: transform 0.2s;
            cursor: pointer;
        }

        .date-card:hover {
            transform: scale(1.03);
        }

        .container{
            outline: 1.8px var(--md-sys-color-outline-variant) solid;
            padding: 16px;
            display:flex;
            flex-direction:row;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(to left, rgba(255,255,255,0.7) 0%, rgba(255, 255, 255, 1) 100%), url("https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/icons%2Fphoto-1553101306-ef133da19bb7%201.png?alt=media&token=fa66bf93-5004-4a15-8ac7-1fe2f2f515d7");
            background-size: cover;
            background-clip: text;
            border-radius: 16px;
            height: 200px;
            width: 470px;
        }

        .info-grid {
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .icon-grid {
            justify-content: center;
            align-items: center;
            text-align:center;
            
        }

        .text-date{
            font-size: 30px;
            font-weight: 800;
            color: white;
            background-color: #C95530;
        }

        .text-date-race{
            font-size: 30px;
            font-weight: 800;
            color: white;
            background-color: #3E3E40;
        }

        .text-tittle{
            font-size: 25px;
            font-weight: 500;
            color: var(--md-sys-color-primary);
        }

        .text-subtittle{
            font-size: 15px;
            font-weight: 300;
            color: var(--md-sys-color-secondary);
        }

        p {
            margin: 10px;
        }

        img{
            mix-blend-mode: difference;
            width: 200px;
            height: 200px;

        }

        .row-cards{
            display: flex;
            flex-direction: row;
            overflow-x: scroll;
            gap: 16px;
            width: 100%;
        }

        ::-webkit-scrollbar {
            width: 0.1em;
            height: 0.2em;
        }

        ::-webkit-scrollbar-thumb {
             background-color: var(--md-sys-color-secondary);
             border-radius: 16px;
             margin: 0.1em;
        }


        @media (max-width: 600px) {
            .row-cards{
                flex-direction: column;}}

        `


    protected override render() {
        return html`
        <div class='row-cards'>
        
            <div class="date-card">
                <div class='container'>
                    <div class="icon-grid">
                        <slot name='icon'>
                            <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/icons%2Freto2cumbres-removebg-preview%201.png?alt=media&token=4b8b9bb4-0ef1-4f5e-9396-d4f7bbbc0809"
                                alt="icono de calendario">
                        </slot>
                    </div>
                    <div class='info-grid'>
                        <p class='text-date'> 19 de Febrero</p>
                        <p class='text-tittle'> RETO "DE DOS CUMBRES" </p>
                    </div>
                </div>
            </div>
        
            <div class="date-card">
                <div class='container'>
                    <div class="icon-grid">
                        <slot name='icon'>
                            <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/icons%2Freto2cumbres-removebg-preview%201.png?alt=media&token=4b8b9bb4-0ef1-4f5e-9396-d4f7bbbc0809"
                                alt="icono de calendario">
                        </slot>
                    </div>
                    <div class='info-grid'>
                        <p class='text-date-race'> 12 de Marzo</p>
                        <p class='text-tittle'>COATL RACE </p>
                        <p class='text-subtittle'>1er Carrera de serial ENDURO, 5 pruebas especiales.</p>
                    </div>
                </div>
            </div>
        
            <div class="date-card">
                <div class='container'>
                    <div class="icon-grid">
                        <slot name='icon'>
                            <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/icons%2Freto2cumbres-removebg-preview%201.png?alt=media&token=4b8b9bb4-0ef1-4f5e-9396-d4f7bbbc0809"
                                alt="icono de calendario">
                        </slot>
                    </div>
                    <div class='info-grid'>
                        <p class='text-date'> 23 de Abril</p>
                        <p class='text-tittle'> RETO "TLALOC" </p>
                        <P class='text-subtittle'>3 Categorias.</P>
                    </div>
                </div>
            </div>
        
            <div class="date-card">
                <div class='container'>
                    <div class="icon-grid">
                        <slot name='icon'>
                            <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/icons%2Freto2cumbres-removebg-preview%201.png?alt=media&token=4b8b9bb4-0ef1-4f5e-9396-d4f7bbbc0809"
                                alt="icono de calendario">
                        </slot>
                    </div>
                    <div class='info-grid'>
                        <p class='text-date-race'> 18 de Junio</p>
                        <p class='text-tittle'>COYOTL RACE</p>
                        <p class='text-subtittle'>2da Carrera de serial ENDURO, 5 pruebas especiales.</p>
                    </div>
                </div>
            </div>
        
            <div class="date-card">
                <div class='container'>
                    <div class="icon-grid">
                        <slot name='icon'>
                            <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/icons%2Freto2cumbres-removebg-preview%201.png?alt=media&token=4b8b9bb4-0ef1-4f5e-9396-d4f7bbbc0809"
                                alt="icono de calendario">
                        </slot>
                    </div>
                    <div class='info-grid'>
                        <p class='text-date'> 24 de Septiembre</p>
                        <p class='text-tittle'> 11va RODADA DE CABEZA</p>
                        <p class='text-subtittle'>Intermedios y Avanzados.</p>
                    </div>
                </div>
            </div>
        
            <div class="date-card" >
                <div class='container'>
                    <div class="icon-grid">
                        <slot name='icon'>
                            <img src="https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/icons%2Freto2cumbres-removebg-preview%201.png?alt=media&token=4b8b9bb4-0ef1-4f5e-9396-d4f7bbbc0809"
                                alt="icono de calendario">
                        </slot>
                    </div>
                    <div class='info-grid'>
                        <p class='text-date-race'> 29 de Octubre</p>
                        <p class='text-tittle'>DESCENSO AL MICTLAN</p>
                        <p class='text-subtittle'>3er Carrera de serial ENDURO, 5 pruebas especiales.</p>
                    </div>
                </div>
            </div>
        
        </div>
        
        `;
    }

      

   
}
