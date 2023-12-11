import { IconColorsProps } from '@/assets/icons/IconColorPropsType.ts'

export const Pin = ({ color = '#000' }: IconColorsProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 11C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.1716 8 10.5 8.67157 10.5 9.5C10.5 10.3284 11.1716 11 12 11Z"
        fill={color}
      />
      <path
        d="M12 2C9.89206 1.99989 7.86926 2.83176 6.37124 4.31479C4.87323 5.79782 4.02108 7.81216 4 9.92C4 15.4 11.05 21.5 11.35 21.76C11.5311 21.9149 11.7616 22.0001 12 22.0001C12.2384 22.0001 12.4689 21.9149 12.65 21.76C13 21.5 20 15.4 20 9.92C19.9789 7.81216 19.1268 5.79782 17.6288 4.31479C16.1307 2.83176 14.1079 1.99989 12 2ZM12 13C11.3078 13 10.6311 12.7947 10.0555 12.4101C9.47993 12.0256 9.03133 11.4789 8.76642 10.8394C8.50151 10.1999 8.4322 9.49612 8.56725 8.81718C8.7023 8.13825 9.03564 7.51461 9.52513 7.02513C10.0146 6.53564 10.6382 6.2023 11.3172 6.06725C11.9961 5.9322 12.6999 6.00151 13.3394 6.26642C13.9789 6.53133 14.5256 6.97993 14.9101 7.5555C15.2947 8.13108 15.5 8.80777 15.5 9.5C15.5 10.4283 15.1313 11.3185 14.4749 11.9749C13.8185 12.6313 12.9283 13 12 13Z"
        fill={color}
      />
    </svg>
  )
}
