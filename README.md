timehash
========

About
-----

> timehash is an algorithm (with multiple reference implementations) for calculating variable precision sliding windows of time. When performing aggregations and correlations on large-scale data sets, the ability to convert precise time values into 'malleable intervals' allows for many novel analytics. 

> Using `[sliding windows of time](http://stackoverflow.com/questions/19386576/sliding-window-over-time-data-structure-and-garbage-collection) is a common practice in data analysis but prior to the timehash algorithm it was more of an art than a science. -- [abeusher/timehash](https://github.com/abeusher/timehash)

Installation
------------

`npm install time-hash -s`

`npm install`

`npm run:cover`

Usage
-------------
### Version 0.8 Update
```
    timehash.encodems(new Date().getTime()) // encodes from milliseconds epoch instead of timeseconds
    timehash.decodems('000000000b') // decodes to milliseconds epoch instead of timeseconds

    > reason: Better compatability with Javascript Date() functions
```
```
    var TimeHash = require('time-hash') // or import TimeHash from 'time-hash'

    let timehash = new TimeHash()

    let [begin, cease] = ['1970-01-01 00:00:00 GMT', '2098-01-01 00:00:00 GMT'] // should use UTC/GMT
    
    let begin_input = new Date(begin) 
    let pivot_input = new Date('2034-01-01 00:00:00 GMT') 
    let cease_input = new Date(cease)

    let begin_hash = timehash.encode_from_datetime(begin_input)
    let pivot_hash = timehash.encode_from_datetime(pivot_input)
    let cease_hash = timehash.encode_from_datetime(cease_input)

    `${begin_hash}`
    '0000000000'
    
    `${pivot_hash}`
    'bfffffffff'
    
    `${cease_hash}`
    'ffffffffff'
    
    begin_hash_after = timehash.after(begin_hash)
    `${begin_hash_after}`
    '0000000001'
    `${timehash.before(begin_hash_after)}` === begin_hash

    let [neighbor_before, neighbor_after] = timehash.neighbors('000000000a')
    `${timehash.before(neighbor_before)}` === begin_hash
    `${neighbor_after}` === '000000000b'

    let input = '000000000a'
    let expand = timehash.expand(input)
    let [expand_before, input_clone, expand_after] = expand
    `${expand_before}` === timehash.before(input_clone)
    `${expand_after}` === timehash.after(input_clone)

    let [begin_value, begin_error] = timehash.decode_exactly('0000000000')
    new Date(begin_value - begin_error).toString() === begin_input.toString()

```

Other Compatible Implementations
---------------

-  python [timehash](https://github.com/abeusher/timehash/blob/master/timehash/__init__.py)
   - a reference implementation in pure python
-  perl [timehash](https://github.com/abeusher/timehash/blob/master/timehash.pl)
   - a reference implementation in perl
-  java [timehash](https://github.com/abeusher/timehash/blob/master/TimeHash.java)
   - a reference implementation in java

### License

Copyright © 2017 LoreFolk, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-starter-kit/blob/master/LICENSE.txt) file.
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.


---
Reference implement made with ♥ by Abe Usher [Abe Usher](https://github.com/abeusher) and [contributors] (https://github.com/abeusher/timehash/blob/master/CONTRIBUTORS.md)

Testing/DepoymentTemplate made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/babel-starter-kit/graphs/contributors)
