import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const TranslateLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
};
