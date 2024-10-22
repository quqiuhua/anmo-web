import logo from '@/assets/logo.png';
import { LogoutOutlined } from '@ant-design/icons';
import { history, useLocation, useModel } from '@umijs/max';
import { Dropdown } from 'antd';

const RightContent = () => {
  const { initialState } = useModel('@@initialState');
  const { setCookie } = useModel('login');
  const { name } = initialState;
  const location = useLocation();

  if (location.pathname === '/') {
    history.replace('/user/normal');
  }

  const onLogout = () => {
    setCookie('');
    history.replace('/login');
  };

  return {
    title: <h3 style={{ color: '#0A7AFF' }}>有幸到家</h3>,
    siderMenuType: 'group',
    fixSiderbar: true,
    fixHeader: true,
    menuHeaderRender: undefined,
    layout: 'mix',
    logo: () => {
      return <img src={logo} alt="" />;
    },
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title: name,
      render: (_, dom) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  onClick: onLogout,
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
  };
};

export default RightContent;
