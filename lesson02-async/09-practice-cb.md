# Practice 1

When we click on "4", `target` is elem4, `currentTarget` is elem1. During the Capturing Phase, we travel down to elem4, but it has no listeners, so none are fired. During the Bubbling Phase, we travel back up. When we reach elem1, there are two listeners. They fire in the order in which they are added, i.e. `target.tagName` then `currentTarget`.


```html
<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
```
```js
let elem1 = document.querySelector('#elem1');

elem1.addEventListener('click', event => alert(event.target.tagName));
elem1.addEventListener('click', event => alert(event.currentTarget.tagName));
```

# Practice 2

Logs "capturing" during the Capturing Phase.
Logs "bubbling" during the Bubbling Phase.

```js
let elem1 = document.querySelector('#elem1');

elem1.addEventListener('click', event => alert("bubbling"));
elem1.addEventListener('click', event => alert("capturing"), true);
```

# Practice 3

Actions:
- Click 1
  - In Target Phase, fires listener on elem1
  - After 7 sec, logs 'DIV'
- Type 'q'
  - In Target Phase, fires listener on document
  - After 7 sec, logs 'KeyQ'
- Type 'w':
  - In Target Phase, fires listener on document
  - After 7 sec, logs 'KeyW'
- Click 4
  - In Bubbling Phase, fires listener on elem1
  - After 7 sec, logs 'MAIN'


```html
<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
<input type=text>
```
```js
let elem1 = document.querySelector('#elem1');

document.addEventListener('keypress', event => {
  setTimeout(() => alert(event.code), 7000);
});

elem1.addEventListener('click', event => {
  setTimeout(() => alert(event.target.tagName), 7000);
});
```
