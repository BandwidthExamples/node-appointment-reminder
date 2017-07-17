export default function normalize(val) {
    val = val.replace(/[\s-()]/g, '')
    if(val.length === 10){
        val = `+1${val}`
    }
    if(!val.startsWith('+')) {
        val = `+${val}`
    }
    return val;
}
