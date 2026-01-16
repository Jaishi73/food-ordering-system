import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [


  // Disable prerender for dynamic route
  {
    path: 'chef/:id',
    renderMode: RenderMode.Client
  },

  //  Disable prerender for checkout (stateful page)
  {
    path: 'checkout',
    renderMode: RenderMode.Client
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
