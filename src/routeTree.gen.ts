/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutUnauthenticatedImport } from './routes/_layout/_unauthenticated'
import { Route as LayoutAuthenticatedImport } from './routes/_layout/_authenticated'
import { Route as LayoutUnauthenticatedIndexImport } from './routes/_layout/_unauthenticated/index'
import { Route as LayoutUnauthenticatedLoginImport } from './routes/_layout/_unauthenticated/login'
import { Route as LayoutAuthenticatedQuestsImport } from './routes/_layout/_authenticated/quests'
import { Route as LayoutAuthenticatedProfileImport } from './routes/_layout/_authenticated/profile'
import { Route as LayoutAuthenticatedLeaderboardImport } from './routes/_layout/_authenticated/leaderboard'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutUnauthenticatedRoute = LayoutUnauthenticatedImport.update({
  id: '/_unauthenticated',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAuthenticatedRoute = LayoutAuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutUnauthenticatedIndexRoute = LayoutUnauthenticatedIndexImport.update(
  {
    id: '/',
    path: '/',
    getParentRoute: () => LayoutUnauthenticatedRoute,
  } as any,
)

const LayoutUnauthenticatedLoginRoute = LayoutUnauthenticatedLoginImport.update(
  {
    id: '/login',
    path: '/login',
    getParentRoute: () => LayoutUnauthenticatedRoute,
  } as any,
)

const LayoutAuthenticatedQuestsRoute = LayoutAuthenticatedQuestsImport.update({
  id: '/quests',
  path: '/quests',
  getParentRoute: () => LayoutAuthenticatedRoute,
} as any)

const LayoutAuthenticatedProfileRoute = LayoutAuthenticatedProfileImport.update(
  {
    id: '/profile',
    path: '/profile',
    getParentRoute: () => LayoutAuthenticatedRoute,
  } as any,
)

const LayoutAuthenticatedLeaderboardRoute =
  LayoutAuthenticatedLeaderboardImport.update({
    id: '/leaderboard',
    path: '/leaderboard',
    getParentRoute: () => LayoutAuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/_authenticated': {
      id: '/_layout/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutAuthenticatedImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/_unauthenticated': {
      id: '/_layout/_unauthenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutUnauthenticatedImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/_authenticated/leaderboard': {
      id: '/_layout/_authenticated/leaderboard'
      path: '/leaderboard'
      fullPath: '/leaderboard'
      preLoaderRoute: typeof LayoutAuthenticatedLeaderboardImport
      parentRoute: typeof LayoutAuthenticatedImport
    }
    '/_layout/_authenticated/profile': {
      id: '/_layout/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof LayoutAuthenticatedProfileImport
      parentRoute: typeof LayoutAuthenticatedImport
    }
    '/_layout/_authenticated/quests': {
      id: '/_layout/_authenticated/quests'
      path: '/quests'
      fullPath: '/quests'
      preLoaderRoute: typeof LayoutAuthenticatedQuestsImport
      parentRoute: typeof LayoutAuthenticatedImport
    }
    '/_layout/_unauthenticated/login': {
      id: '/_layout/_unauthenticated/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LayoutUnauthenticatedLoginImport
      parentRoute: typeof LayoutUnauthenticatedImport
    }
    '/_layout/_unauthenticated/': {
      id: '/_layout/_unauthenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutUnauthenticatedIndexImport
      parentRoute: typeof LayoutUnauthenticatedImport
    }
  }
}

// Create and export the route tree

interface LayoutAuthenticatedRouteChildren {
  LayoutAuthenticatedLeaderboardRoute: typeof LayoutAuthenticatedLeaderboardRoute
  LayoutAuthenticatedProfileRoute: typeof LayoutAuthenticatedProfileRoute
  LayoutAuthenticatedQuestsRoute: typeof LayoutAuthenticatedQuestsRoute
}

const LayoutAuthenticatedRouteChildren: LayoutAuthenticatedRouteChildren = {
  LayoutAuthenticatedLeaderboardRoute: LayoutAuthenticatedLeaderboardRoute,
  LayoutAuthenticatedProfileRoute: LayoutAuthenticatedProfileRoute,
  LayoutAuthenticatedQuestsRoute: LayoutAuthenticatedQuestsRoute,
}

const LayoutAuthenticatedRouteWithChildren =
  LayoutAuthenticatedRoute._addFileChildren(LayoutAuthenticatedRouteChildren)

interface LayoutUnauthenticatedRouteChildren {
  LayoutUnauthenticatedLoginRoute: typeof LayoutUnauthenticatedLoginRoute
  LayoutUnauthenticatedIndexRoute: typeof LayoutUnauthenticatedIndexRoute
}

const LayoutUnauthenticatedRouteChildren: LayoutUnauthenticatedRouteChildren = {
  LayoutUnauthenticatedLoginRoute: LayoutUnauthenticatedLoginRoute,
  LayoutUnauthenticatedIndexRoute: LayoutUnauthenticatedIndexRoute,
}

const LayoutUnauthenticatedRouteWithChildren =
  LayoutUnauthenticatedRoute._addFileChildren(
    LayoutUnauthenticatedRouteChildren,
  )

interface LayoutRouteChildren {
  LayoutAuthenticatedRoute: typeof LayoutAuthenticatedRouteWithChildren
  LayoutUnauthenticatedRoute: typeof LayoutUnauthenticatedRouteWithChildren
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutAuthenticatedRoute: LayoutAuthenticatedRouteWithChildren,
  LayoutUnauthenticatedRoute: LayoutUnauthenticatedRouteWithChildren,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutUnauthenticatedRouteWithChildren
  '/leaderboard': typeof LayoutAuthenticatedLeaderboardRoute
  '/profile': typeof LayoutAuthenticatedProfileRoute
  '/quests': typeof LayoutAuthenticatedQuestsRoute
  '/login': typeof LayoutUnauthenticatedLoginRoute
  '/': typeof LayoutUnauthenticatedIndexRoute
}

export interface FileRoutesByTo {
  '': typeof LayoutAuthenticatedRouteWithChildren
  '/leaderboard': typeof LayoutAuthenticatedLeaderboardRoute
  '/profile': typeof LayoutAuthenticatedProfileRoute
  '/quests': typeof LayoutAuthenticatedQuestsRoute
  '/login': typeof LayoutUnauthenticatedLoginRoute
  '/': typeof LayoutUnauthenticatedIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/_authenticated': typeof LayoutAuthenticatedRouteWithChildren
  '/_layout/_unauthenticated': typeof LayoutUnauthenticatedRouteWithChildren
  '/_layout/_authenticated/leaderboard': typeof LayoutAuthenticatedLeaderboardRoute
  '/_layout/_authenticated/profile': typeof LayoutAuthenticatedProfileRoute
  '/_layout/_authenticated/quests': typeof LayoutAuthenticatedQuestsRoute
  '/_layout/_unauthenticated/login': typeof LayoutUnauthenticatedLoginRoute
  '/_layout/_unauthenticated/': typeof LayoutUnauthenticatedIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/leaderboard' | '/profile' | '/quests' | '/login' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/leaderboard' | '/profile' | '/quests' | '/login' | '/'
  id:
    | '__root__'
    | '/_layout'
    | '/_layout/_authenticated'
    | '/_layout/_unauthenticated'
    | '/_layout/_authenticated/leaderboard'
    | '/_layout/_authenticated/profile'
    | '/_layout/_authenticated/quests'
    | '/_layout/_unauthenticated/login'
    | '/_layout/_unauthenticated/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/_authenticated",
        "/_layout/_unauthenticated"
      ]
    },
    "/_layout/_authenticated": {
      "filePath": "_layout/_authenticated.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_authenticated/leaderboard",
        "/_layout/_authenticated/profile",
        "/_layout/_authenticated/quests"
      ]
    },
    "/_layout/_unauthenticated": {
      "filePath": "_layout/_unauthenticated.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_unauthenticated/login",
        "/_layout/_unauthenticated/"
      ]
    },
    "/_layout/_authenticated/leaderboard": {
      "filePath": "_layout/_authenticated/leaderboard.tsx",
      "parent": "/_layout/_authenticated"
    },
    "/_layout/_authenticated/profile": {
      "filePath": "_layout/_authenticated/profile.tsx",
      "parent": "/_layout/_authenticated"
    },
    "/_layout/_authenticated/quests": {
      "filePath": "_layout/_authenticated/quests.tsx",
      "parent": "/_layout/_authenticated"
    },
    "/_layout/_unauthenticated/login": {
      "filePath": "_layout/_unauthenticated/login.tsx",
      "parent": "/_layout/_unauthenticated"
    },
    "/_layout/_unauthenticated/": {
      "filePath": "_layout/_unauthenticated/index.tsx",
      "parent": "/_layout/_unauthenticated"
    }
  }
}
ROUTE_MANIFEST_END */
