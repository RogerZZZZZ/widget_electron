
class Utils{
    /**
     * find one specific element in an array, and return its index.
     */
    findElement(target, arr) {
        let size = arr.length;
        for(var i = 0; i < size; i++){
            if(target === arr[i]) return i;
        }
        return -1;
    }

    /**
     * remove one specific element from one array and then return the modified array.
     */
    removeElement(target, arr){
        return arr.splice(this.findElement(target, arr), 1);
    }

    /**
     * insert one specific element to an array and then return it;
     */
    insertElement(target, arr){
        return arr.concat(target);
    }

    /**
     * find the active tabs and return.
     */
    findActiveTabs(list){
        let res = [];
        for(var item in list){
            if(list[item].state === true){
                res[res.length] = list[item]
            }
        }
        return res;
    }

    getAllWidget(list){
        let res = [];
        for(var item in list){
            res[res.length] = list[item]
        }
        return res;
    }

    timeCalculator(startTime, endTime, type){
        if(type === 'day'){
            let dif = endTime.diff(startTime, 'days', true);
            dif = dif > 0 ? Math.ceil(dif): 0
            return dif;
        }
    }

    judgeValidTime(startTime, endTime){
        return startTime.isBefore(endTime) ? true: (endTime.isSame(startTime, 'day') ? true: false);
    }

    /**
     * find the element in arr by id.
     */
    modifyElementInArr(arr, element){
        let newId = element.id;
        for(let item in arr){
            if(arr[item].id === newId){
                arr[item] = element;
                break;
            }
        }
        return arr;
    }

    deleteElementInArr(arr, itemId){
        for(let item in arr){
            if(arr[item].id === itemId){
                arr.splice(parseInt(item), 1);
                break;
            }
        }
        return arr;
    }

    elementFilter(arr, targetAttr, filterVal){
        let res = [];
        for(let item in arr){
            if(arr[item][targetAttr] !== filterVal){
                res.push(arr[item]);
            }
        }
        return res;
    }

    floatFormat(nums, pos){
        return Math.round(nums * Math.pow(10, pos))/Math.pow(10, pos);
    }
}

export default Utils;
