let maps = []
window.onload = e => {
    const walls = getWall()
    const start = document.getElementsByClassName('row')[0].children[0]
    $(start).addClass('mouse')
    search([0, 0], walls)
}

function search(position, walls) {
    const y = position[0],
        x = position[1],
        wall = walls[x][y]
    let routes = [
        [y, x - 1],
        [y, x + 1],
        [y - 1, x],
        [y + 1, x]
    ]
    routes = routes.filter(val => {
        for (let i = 0; i < wall.length; i++) {
            if (notequal(wall[i], val)) continue
            else {
                return false
            }
        }
        return true
    })
    console.log(routes)
}

function notequal(a, b) {
    if (b[0] < 0 || b[1] < 0) return false
    return a[0] !== b[0] || (a[1] !== b[1])
}


function getWall() {
    const rows = Array.prototype.slice.call(document.getElementsByClassName('row'))
    let arr = []
    //列
    rows.map((row, i) => {
        maps.push([])
        arr.push([])
        //行
        Array.prototype.slice.call(row.children).map((child, index) => {
            let ceil = child.className.split(' ')
            arr[i].push([])
            ceil.map(direction => {
                switch (direction) {
                    case 'top':
                        arr[i][index].push([index, i - 1])
                        break
                    case 'left':
                        arr[i][index].push([index - 1, i])
                        break
                    case 'right':
                        arr[i][index].push([index + 1, i])
                        break
                    case 'bottom':
                        arr[i][index].push([index, i + 1])
                        break
                    default:
                        break
                }
            })
        })
    })
    return arr
}