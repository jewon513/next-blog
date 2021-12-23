import dayjs, {Dayjs} from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const tz = (
  d?:string | number | dayjs.Dayjs | Date | null | undefined
)=>{
  if(!d){
    d = new Date();
  }
  return dayjs.tz(d)
}

export default tz