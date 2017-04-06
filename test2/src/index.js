let current = [0, 0]
window.onload = e => {
    const walls = getWall()
    const start = document.getElementsByClassName('row')[0].children[0]
    $(start).addClass('mouse')
    let target
    window.addEventListener('keydown', e => {
        switch (e.code) {
            case 'ArrowUp':
                target = [current[0], current[1] - 1]
                current = move(current, target, walls)
                break
            case 'ArrowDown':
                target = [current[0] , current[1]+ 1]
                current = move(current, target, walls)
                break
            case 'ArrowLeft':
                target = [current[0] - 1, current[1]]
                current = move(current, target, walls)
                break
            case 'ArrowRight':
                target = [current[0]+ 1, current[1] ]
                current = move(current, target, walls)
                break
        }
    }, false)
}


function move(current, target, walls) {
    if(target[0]<=0||target[0]>=20){
        return current
    }
    let wall = walls[current[1]][current[0]]
    for (let i = 0; i < wall.length; i++) {
        if (wall[i][0] === target[0] && wall[i][1] === target[1]) {
            return current
        }
    }
    current = document.getElementsByClassName('row')[current[1]].children[current[0]]
    let newtarget = document.getElementsByClassName('row')[target[1]].children[target[0]]
    $(current).removeClass('mouse')
    $(newtarget).addClass('mouse')
    return target
}

function getWall() {
    const rows = Array.prototype.slice.call(document.getElementsByClassName('row'))
    let arr = []
    //列
    rows.map((row, i) => {
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