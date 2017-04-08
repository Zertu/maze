let maps = [],
    ways = []
const end = [20, 20]
window.onload = e => {
    const walls = getWall()
    const start = document.getElementsByClassName('row')[0].children[0]
    $(start).addClass('mouse')
    search([
        0, 0
    ], walls)
    for (let i = 0; i < ways.length; i++) {
        $(document.getElementsByClassName('row')[ways[i][1]].children[ways[i][0]]).addClass('mouse')

    }

}

function search(position, walls) {
    ways.push(position)
    const y = position[0],
        x = position[1],
        wall = walls[x][y]
    if (x == 20 && y == 20) 
        return;
    let routes = [
        [
            y, x - 1
        ],
        [
            y, x + 1
        ],
        [
            y - 1,
            x
        ],
        [
            y + 1,
            x
        ]
    ]
    if (!maps[x][y]) {
        maps[x][y] = 1
    } else {
        return
    }
    routes = routes.filter(val => {
        if (wall) {
            for (let i = 0; i < wall.length; i++) {
                if (notequal(wall[i], val)) 
                    continue
                else {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    })
    if (routes.length == 0) {
        back(walls)
        return maps[x][y] = 2
    }
    for (let i = 0; i < routes.length; i++) {
        search(routes[i], walls)
    }
}

function back(walls) {
    while (!canvisit(walls)) {
    ways.pop()
        back(walls)
    }
}

function canvisit(walls) {
    const position = ways[ways.length - 1]
        const y = position[0],
            x = position[1],
            wall = walls[x][y]
        let routes = [
            [
                y, x - 1
            ],
            [
                y, x + 1
            ],
            [
                y - 1,
                x
            ],
            [
                y + 1,
                x
            ]
        ]
        routes = routes.filter(val => {
            if (wall) {
                for (let i = 0; i < wall.length; i++) {
                    if (notblock(wall[i], val)) 
                        continue
                    else {
                        return false
                    }
                }
                return true
            } else {
                return false
            }
        })
        for (let i = 0; i < routes.length; i++) {
            if (maps[routes[1]] && !(maps[routes[1]][routes[0]])) {
                console.log(maps[routes[1]][routes[0]])
                return true
            }
        }
        return false
    }

    function notblock(a,b){
                if (b[0] < 0 || b[1] < 0) 
            return false
        return a[0] !== b[0] || (a[1] !== b[1])
    }

    function notequal(a, b) {
        if (b[0] < 0 || b[1] < 0) 
            return false
        if (maps[b[1]] && maps[b[1]][b[0]] == 1) 
            return false
        return a[0] !== b[0] || (a[1] !== b[1])
    }

    function getWall() {
        const rows = Array
            .prototype
            .slice
            .call(document.getElementsByClassName('row'))
        let arr = []
        //列
        rows.map((row, i) => {
            maps.push([])
            arr.push([])
            //行
            Array
                .prototype
                .slice
                .call(row.children)
                .map((child, index) => {
                    let ceil = child
                        .className
                        .split(' ')
                    arr[i].push([])
                    ceil.map(direction => {
                        switch (direction) {
                            case 'top':
                                return arr[i][index].push([
                                    index, i - 1
                                ])

                            case 'left':
                                return arr[i][index].push([
                                    index - 1,
                                    i
                                ])
                            case 'right':
                                return arr[i][index].push([
                                    index + 1,
                                    i
                                ])
                            case 'bottom':
                                return arr[i][index].push([
                                    index, i + 1
                                ])
                            default:
                                break
                        }
                    })
                })
        })
        return arr
    }