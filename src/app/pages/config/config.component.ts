import { Component } from '@angular/core';
import { ConfigCanvasComponent } from "../../components/config/config-canvas/config-canvas.component";

@Component({
  selector: 'page-config',
  imports: [ConfigCanvasComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {

}
