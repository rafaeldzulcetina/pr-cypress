# Vue Clean template 💪🏻😎
Template base de vue 2 con sabor a clean architecture

## Login en code artifact
***
Para poder hacer uso de los repos de npm y bajar las dependencias de aws code artifact en este caso la libreria de componentes,
es necesario hacer login en code artifact previo a este paso **debemos tener ya configurado nuestro aws cli**

### Code artifact en windows
```
$Env:CODEARTIFACT_AUTH_TOKEN=aws codeartifact get-authorization-token --domain dev-it-palaceresorts --domain-owner 427784172992 --query authorizationToken --output text
```

### Code artifact en Linux/Mac os
```
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain dev-it-palaceresorts --domain-owner 427784172992 --query authorizationToken --output text`
```

## Iniciar servidor de desarrollo
```
yarn run serve
```

## Compilar proyecto para producción
```
yarn build
```

## Compilar y correr servidor como si fuese producción (pruebas PWA)
```
yarn serve:dist
```

## Formatear código con linter
***
A todos nos gusta el código ordenado y un estilo marcado para escribirlo por lo que si has terminado una
feature y haras algun pull request es recomendable que ejecutes el linter dado que todos debemos seguir ciertas reglas
al escribir código y en el caso de que alguna de estas no se cumpla el proyecto no compilara
```
yarn lint
```

## Layout principal 📦
Dentro de nuestro, témplate tenemos 2 layouts actualmente ```mainLayout.vue``` y ```basiclayout.vue``` estos layouts
tienen en común una cosa **comparten los componentes que utilizamos de manera global**
por ejemplo un toast, una notification, etc.

### MainLayout
Lo que lo hace diferente es que **tiene una serie de componentes definidos de acuerdo al diseño** del sistema en
figma lo que hace fácil el modificar o cambiar alguna sección

### BasicLayout
Por otra parte, este layout **tiene únicamente los componentes esenciales a nivel global del sistema**, el resto de UI,
lo puedes modificar a necesidad este layout está pensado con el fin de maquetar vistas excepcionales las cuales
puedan surgir y no tengan nada en común con el diseño principal del sistema (el login por ejemplo 😊)

## Guia y estándares de código 💻

### Pascal casé para nombres de clase 🔮
```
❌ No hagas esto
class patito_cuack_cuak {}
class patitoCuakCuak {}
```
```
✅ Correcto
class PatitoCuack {}
```
***

### Camel casé para nombres de carpetas, archivos, variables y métodos 🐪
Tenemos como equipo una convención para dar nombre a archivos y carpetas que debemos seguir
#### Carpetas y archivos
```
❌ No hagas esto
src
 | - MyCapeta
     | - MyArchivo.vue
```
```
✅ Correcto
src
 | - myCarpeta
     | - myArchivo.vue
```
***

#### Variables y métodos
```
❌ No hagas esto
class myImplementacion {
  HacerAlgo() {
    const MyVariable = 10;
  }
}
```
```
✅ Correcto
class MyImplementacion {
  hacerAlgo() {
    const myVariable1 = 10;
  }
}
```

***
### No usar prefijos para nombres que den demasiado contexto
Ojo pueden existir excepciones muy puntuales pero son contadas
```
❌ No hagas esto
- IUser
- RegiserUserUseCase
- GuestInterface
- UpdateUserDto
```

```
✅ Correcto
User
RegisterUser
Guest
CreateUser
UpdateUser
```

***
### Usar triple igualdad 🔨
Ya no aceptamos que `3 == '3'` sea `true` esto se presta a que tengamos menos control sobre los tipos de datos que usamos
y perdamos un poco el tipado estático

```
❌ No hagas esto
const algo = '2';
if (algo == 2) // resulta true
```

```
✅ Correcto
const algo = '2';
if (algo === 2) // resulta false
if (algo === Number.parseInt(algo)) // resulta true
```

***
### Témplate html limpio - Programador feliz 🥰
Un componente, página o cualquier cosa que tenga que estar dentro de la sección del templete de vue tiene 3 simples reglas:

* Solo debe tener la responsabilidad y control de elementos que tengan que ver con el render
* Debe ser corto no podemos tener un templete con más de 200 líneas
* Debe ser aún más corto divide por componentes y no metas todo en uno solo

Cuando hacer un componente estamos tentados a hacer comprobaciones directas en el templete para no complicarnos las cosas,
pero esto trae consigo más problemas que beneficios dado que mi témplate deja de tener la responsabilidad de solo controlar el UI
para pasar a hacer comprobaciones, asignaciones, etc.

El templete debe preguntar, lanzar acciones, pero nada más allá de eso además con esta práctica agregamos legibilidad
a nuestro código
```
❌ No hagas esto
<template>
  <div v-if="usuario.genero === 'mujer'">
    El usuario es mujer
  </div>
  <div v-else>
    El usuario es hombre
  </div>
</template>
```

```
✅ Correcto
<template>
  <div v-if="esElUsuarioUnaMujer">
    El usuario es mujer
  </div>
  <div v-else>
    El usuario es hombre
  </div>
</template>

<script>
// ...code
get esElUsuarioUnaMujer() {
  return this.usuario.genero === GenerosDeUsuario.Mujer;
}
</script>
```

### Código en un solo idioma (inglés) 🇺🇸
Tengamos una simple regla para el idioma que sea siempre el mismo.
```
❌ No hagas esto
const user = new Usuario();
const ageOfNuevoUsuario = user.edad();
```

```
✅ Correcto
const user = new User();
const ageOfUser = user.age();
```

***
### Dame contexto que no soy adivino 🤡
**_Un hechizo simple, pero inquebrantable_**

Piensa en el siguiente escenario en el que yo escribo un código el cual entrego y posteriormente tú sin nada de
conocimiento previo de lo que estuve haciendo tiene que mantener mi código o hacer una modification ahora imagina que lo
abres y encuentras esto:

```
❌ No hagas esto
if (user.role === 0)
  // code...
else if (user.role === 1)
  // code
```

#### Lo primero que talvez te preguntes es
* ¿Que es 0?
* ¿Por qué 0?
* ¿De dónde viene ese 0?

Bien ahora imagina que entras y en lugar del caso anterior encuentras esto
```
✅ Correcto

// src/app/module/domain/data/userRole.ts

Enum UserRole {
  ADMIN = 0,
  GUEST_SERVICE = 1,
  OPC = 2
}

// src/ui/someComponent.vue

if (user.role === UserRole.ADMIN)
  // code...
else if (user.role === UserRole.OPC)
  // code
```
***

### Lazy loading para rutas
¡Queremos bundle pequeños y solo cuando los queremos! Evitemos compilaciones pesadas
(caso excepcional layouts).

```
❌ No hagas esto
import Some from '@/ui/pages/some/some.vue';

{
  path: '/some-path',
  name: 'some',
  component: Some,
},
```

```
✅ Correcto
{
  path: '/some-path',
  name: 'some',
  component: () => import('@/ui/pages/some/some.vue'),
},
```

## Breadcrumbs 🍞
El sistema cuenta con un mecanismo de navegación por breadcrumbs los cuales para poder hacer uso de ellos necesitamos
seguir una serie de pasos importantes que se presentan a continuación:

### Registrar las traducciones 🇲🇽🇺🇸
Para hacer uso del breadcrumb debemos primero registrar las traducciones para los idiomas que tengamos disponibles
en el siguiente archivo: `src/ui/components/layouts/appBreadcrumbs/appBreadcrumbs.lang.ts`
```
export default {
  messages: {
    'es-MX': {
      home: 'Elite Contracts',
      notFound: 'Pagina no encontrada',
      tours: 'Tours',
      captureContracts: 'Captura de contratos',
    },
    'en-US': {
      home: 'Elite Contracts',
      notFound: 'Page not found',
      tours: 'Tours',
      captureContracts: 'Contract capture',
    },
  },
};
```

### Habilitar el breadcrumb dentro del router
El breadcrumb funciona en conjunto con el router por lo que debemos ir a nuestro archivo de rutas
dentro de: `src/ui/router/routes.ts` y dentro de la propiedad meta registrar nuestros breadcrumbs
(Recuerda que existe una interfaz llamada `BreadcrumbItem` que debes respetar para que todo funcione correctamente)
```
{
  component: () => import('@/ui/pages/dev/miComponent.vue'),
  path: '/todo',
  name: 'todo',
  meta: {
    breadCrumb: [
      {
        text: 'home',
        path: '/',
      },
      {
        text: 'todo',
        path: '/todo',
      },
    ],
  },
},
```

## Librería de componentes 🧩
EN PROGRESO STORYBOOK

## Estructura y capaz de un módulo
* CONST SOBRE LET

## Lecturas importantes 🤓

* [Buenas prácticas de repositories no más DAOS](https://our-academy.org/posts/el-patron-repository:-implementacion-y-buenas-practicas)
* [Vue Con typescript](https://blog.logrocket.com/vue-typescript-tutorial-examples) (Referencia preguntar por guía de estilo de código del equipo)
