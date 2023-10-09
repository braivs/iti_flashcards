import { PersonalInformation } from '@/components/personal-information'
import {
  useGetMeQuery,
  useLogoutMutation,
  usePatchMeMutation,
  //usePatchMeMutation,
} from '@/services/auth/auth.service.ts'

export const PersonalInformationPage = () => {
  const [logout] = useLogoutMutation()
  const { data } = useGetMeQuery()
  const [updateData] = usePatchMeMutation()

  const onChangePersonalData = (data: FormData) => {
    updateData(data)
  }
  const onChangeAvatar = (data: FormData) => {
    updateData(data)
  }

  return (
    <PersonalInformation
      avatar={data.avatar}
      userName={data.name}
      userEmail={data.email}
      onLogout={logout}
      onChangePersonalData={onChangePersonalData}
      onChangeAvatar={onChangeAvatar}
    />
  )
}
