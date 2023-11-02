import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import './styles.scss';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
