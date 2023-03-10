import { combineLatest, fromEvent, forkJoin, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Address, User } from './model';

const users: User[] = [
  {
    id: 0,
    name: 'Donald Mayfield',
  },
  {
    id: 1,
    name: 'Jill J. Fritz',
  },
  {
    id: 2,
    name: 'Terry Buttram',
  },
];

const address: Address[] = [
  {
    street: '2180 BELLFLOWER',
    country: 'USA',
    state: 'AL',
    city: 'Madison',
    zipCode: 35064,
  },
  {
    street: '845 ODOM ROAD, SUITE 200',
    country: 'USA',
    state: 'CA',
    city: 'Los Angeles',
    zipCode: 90720,
  },
  {
    street: '9025 QUEENS BLVD',
    country: 'USA',
    state: 'NY',
    city: 'Queens',
    zipCode: 11355,
  },
];

// A helper function - getAddress(id)
const getAddress = (userId: number) => of(address[userId]);

// Observables - declaration
let users$: Observable<User[]>;
let address$: Observable<Address[]>;

// Observables - assignation
users$ = of(users);

address$ = users$.pipe(
  switchMap((users: User[]) => {
    console.log('users', users);
    const addressArray$: Observable<Address>[] = [];
    users.forEach((user) => {
      const address$: Observable<Address> = getAddress(user.id);
      addressArray$.push(address$);
    });
    // [Observable<Address>, Observable<Address>, ....., Observable<Address>]
    return forkJoin(addressArray$);
  })
);

// Subscription
address$.subscribe((address: Address[]) => {
  console.log('address', address); // Prints the array of addresses: Address[]
});

// 1. Define multiple observables
let color = of('Black', 'Red', 'Blue');
let brand = of('Jaguar', 'Ford', 'BMW');
let model = of('manual','automatic');
let price = of(100, 200, 300);

// 2. Call combineLatest operator, inject multiple observables in array
const joinStream = combineLatest( brand, price, model, color);

// 3. Subscibe combineLatest observable
const subscribe = joinStream.subscribe((latestItem) => {
  console.log(latestItem);
});
