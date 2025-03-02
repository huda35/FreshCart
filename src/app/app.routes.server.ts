import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path:"brandsdetails/:id",
    renderMode:RenderMode.Server
  },
  {
    path:"categorydetails/:id",
    renderMode:RenderMode.Server
  },
  {
    path:"productDetails/:id",
    renderMode:RenderMode.Server
  },
  {
    path:"checkout/:cartId",
    renderMode:RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
