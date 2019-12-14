# Javascript Linq

Try it: https://codepen.io/iroshan/pen/LYENvVZ

**Functions**
- *select(value => value /* object */)* /* return the selected object */
- *where(value => value /* consition */)* /* filter the source by the condition */
- *orderBy(value => value /* object */)* /* sort the source by the object */
  - *asc()*
  - *desc()*
- *groupBy(value => value /* object */)* /* group the source values by the object */
- *offset(int /* offset between 0 and (source.length - 1) */)*
- *limit(int /* limit between 1 and source.length */)*
- *first()* /* first element from source */
- *last()* /* last element from source */
- *map((value, key, array) => value)*
- *reduce((accumulator, value) => accumulator + value)*
- *isIn(array)*
- *startWith(searchString)*
- *endWith(searchString)*
- *isLike(searchString)*

**Source data**

Based on https://www.w3schools.com

```javascript
const customers = [
  {
    Id           : 1,
    CustomerName : "Alfreds Futterkiste",
    ContactName  : "Maria Anders",
    Address      : "Obere Str. 57",
    City         : "Berlin",
    PostalCode   : "12209",
    Country      : "Germany",
    Income       : 1200,
  },
  {
    Id           : 2,
    CustomerName : "Ana Trujillo Emparedados y helados",
    ContactName  : "Ana Trujillo",
    Address      : "Avda. de la Constitución 2222",
    City         : "México D.F.",
    PostalCode   : "05021",
    Country      : "Mexico",
    Income       : 0,
  },
  {
    Id           : 3,
    CustomerName : "Antonio Moreno Taquería",
    ContactName  : "Antonio Moreno",
    Address      : "Mataderos 2312",
    City         : "México D.F.",
    PostalCode   : "05023",
    Country      : "Mexico",
    Income       : 850,
  },
  {
    Id           : 4,
    CustomerName : "Around the Horn",
    ContactName  : "Thomas Hardy",
    Address      : "120 Hanover Sq.",
    City         : "London",
    PostalCode   : "WA1 1DP",
    Country      : "UK",
    Income       : 2000,
  },
  {
    Id           : 5,
    CustomerName : "Berglunds snabbköp",
    ContactName  : "Christina Berglund",
    Address      : "Berguvsvägen 8",
    City         : "Luleå",
    PostalCode   : "S-958 22",
    Country      : "Sweden",
    Income       : 3500,
  }
];
```

**Examples / Usage**

```javascript
/*Customers from Mexico order by Id asc*/
console.log(
  customers
    .select(value => ({
      Id           : value.Id,
      CustomerName : value.CustomerName,
      Country      : value.Country
    }))
    .where(value => value.Country === "Mexico")
    .orderBy(value => value.Id).asc()
);

/*Customers from Sweden*/
console.log(
  customers.where(value => value.Country === "Sweden")
);

/*Higher income customers order by Income desc*/
console.log(
  customers
    .where(value => value.Income >= 1000)
    .orderBy(value => value.Income).desc()
);

/*First lowest income order by Income asc*/
console.log(
  customers
    .select(value => ({
      Id           : value.Id,
      CustomerName : value.CustomerName,
      Income       : value.Income
    }))
    .orderBy(value => value.Income).asc()
    .first()
);

/*Highest income*/
console.log(
  customers
    .select(value => ({
      Id           : value.Id,
      CustomerName : value.CustomerName,
      Income       : value.Income
    }))
    .orderBy(value => value.Income).asc()
    .last()
);

/*All income*/
console.log(
  customers
    .select(value => value.Income)
    .reduce((accumulator, value) => accumulator + value)
);

/*Offset 2 limit 3 (ids: [3, 4, 5])*/
console.log(
  customers.offset(2).limit(3)
);

/*Group by country, order by CustomerName*/
console.log(
  customers
    .groupBy(value => value.Country)
    .map((value, key, array) => {
      value.orderBy(value => value.CustomerName).desc();
    })
);
```
