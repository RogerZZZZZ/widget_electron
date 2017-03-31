
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
            return Math.round((endTime - startTime)/(3600000*24));
        }
    }

    judgeValidTime(startTime, endTime){
        return endTime-startTime > 0 ? true: endTime.isSame(startTime, 'day') ? true: false;
    }

}

export default Utils;
