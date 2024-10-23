import Visible from '@/components/Visible';
import { PASS_OR_NOTPASS_OPTIONS } from '@/constants/index';
import {
  ModalForm,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormGroup,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form, Image, Space, type UploadFile, message } from 'antd';
import React, { type ReactElement, useEffect, useState } from 'react';
import { getFormValues } from '../../util';
import styles from './index.less';

interface Props {
  children: ReactElement;
  masterId: string;
  mode: 'detail' | 'audit';
}

interface FormValues {
  finishedCount: number;
  rewardAmount: number;
  limitDay: number;
  certificateList: any[];
}

const MassagerInfo: React.FC<Props> = ({ children, masterId, mode }) => {
  const { queryWorkerDetail, auditQualification, queryWorkerData } =
    useModel('worker');
  const [form] = Form.useForm<FormValues>();
  const [certificateList, setCertificateList] = useState([]);
  const show1 =
    Form.useWatch(['certificateList', 0, 'auditStatus'], form) === 3;
  const show2 =
    Form.useWatch(['certificateList', 1, 'auditStatus'], form) === 3;
  const show3 =
    Form.useWatch(['certificateList', 2, 'auditStatus'], form) === 3;
  const show4 =
    Form.useWatch(['certificateList', 3, 'auditStatus'], form) === 3;
  const show5 =
    Form.useWatch(['certificateList', 4, 'auditStatus'], form) === 3;
  const show6 =
    Form.useWatch(['certificateList', 5, 'auditStatus'], form) === 3;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const isDetail = mode === 'detail';

  useEffect(() => {}, []);

  const queryDetail = async (open: boolean) => {
    if (open) {
      const res = await queryWorkerDetail.run({
        masterId,
      });
      const values = getFormValues(res);
      setCertificateList(values.certificateList);
      form.setFieldsValue(values);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || '');
    setPreviewOpen(true);
  };

  const onSubmit = async (values) => {
    console.log(values);
    const formCertificateList = values.certificateList || [];
    const newCertificateList = certificateList.map((item, index) => ({
      certificateId: item.certificateId,
      refuseReason: formCertificateList[index].refuseReason,
      auditStatus: formCertificateList[index].auditStatus,
    }));
    const params = {
      masterId: queryWorkerDetail.data?.masterId,
      certificateList: newCertificateList,
    };
    const res = await auditQualification.run(params);
    if (res) {
      message.success('提交成功');
      queryWorkerData.refresh();
    }
    return true;
  };

  return (
    <ModalForm<FormValues>
      title={isDetail ? '技师信息' : '技师资料审核'}
      trigger={children}
      form={form}
      loading={queryWorkerDetail.loading}
      width={isDetail ? 500 : 680}
      disabled={isDetail}
      onOpenChange={queryDetail}
      layout="horizontal"
      className={styles['modal-form']}
      labelAlign="left"
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitter={
        isDetail
          ? false
          : {
              submitButtonProps: {
                loading: false,
              },
            }
      }
      onFinish={onSubmit}
    >
      <ProFormGroup title="个人信息">
        <ProFormText
          width="md"
          name="masterName"
          label="姓名"
          placeholder="请输入姓名"
        />
        <Space>
          <ProFormRadio.Group
            width="md"
            options={[
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ]}
            name="sex"
            label="性别"
          />
        </Space>
        <ProFormText
          width="md"
          name="nickName"
          label="昵称"
          placeholder="请输入昵称"
        />
        <ProFormText
          width="md"
          name="idCard"
          label="身份证号"
          placeholder="请输入身份证号"
        />
        <ProFormText
          width="md"
          name="companyName"
          label="商家名称"
          placeholder="请输入商家名称"
        />
        <ProFormCascader
          width="md"
          fieldProps={{
            options: [
              { label: '广州市', value: '440100' },
              { label: '合肥市', value: '340100' },
            ],
          }}
          name="cityCode"
          label={isDetail ? '所在城市' : '意向城市'}
          placeholder="请选择所在城市"
        />
        {isDetail && (
          <ProFormText
            width="md"
            name="lastLoginAddress"
            label="地址"
            placeholder="请输入地址"
          />
        )}
        <ProFormDatePicker width="md" name="endDate" label="健康证到期日" />
        <ProFormCheckbox.Group
          width="md"
          options={[]}
          name="projectList"
          label="可服务项目"
        />
      </ProFormGroup>
      <ProFormGroup title="证照信息">
        <ProFormUploadButton
          width="sm"
          label="生活照"
          name="LIFE"
          max={3}
          disabled
          title="点击上传"
          rules={[{ required: true, message: '请上传生活照' }]}
          fieldProps={{
            onPreview: handlePreview,
          }}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <Visible visible={!isDetail}>
          <ProFormRadio.Group
            name={['certificateList', 0, 'auditStatus']}
            width="sm"
            options={PASS_OR_NOTPASS_OPTIONS}
          />
          {show1 && (
            <ProFormText
              name={['certificateList', 0, 'refuseReason']}
              rules={[{ required: true, message: '请输入不通过原因' }]}
              placeholder="请输入不通过原因"
            />
          )}
        </Visible>
        <ProFormUploadButton
          width="sm"
          label="营业执照"
          title="点击上传"
          max={1}
          disabled
          name="LICENSE"
          fieldProps={{
            onPreview: handlePreview,
          }}
          rules={[{ required: true, message: '请上传营业执照' }]}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <Visible visible={!isDetail}>
          <ProFormRadio.Group
            name={['certificateList', 1, 'auditStatus']}
            width="sm"
            options={PASS_OR_NOTPASS_OPTIONS}
          />
          {show2 && (
            <ProFormText
              name={['certificateList', 1, 'refuseReason']}
              placeholder="请输入不通过原因"
              rules={[{ required: true, message: '请输入不通过原因' }]}
            />
          )}
        </Visible>
        <ProFormUploadButton
          width="sm"
          max={2}
          disabled
          label="身份证照片"
          fieldProps={{
            onPreview: handlePreview,
          }}
          name="ID_CARD"
          rules={[{ required: true, message: '请上传身份证照片' }]}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <Visible visible={!isDetail}>
          <ProFormRadio.Group
            name={['certificateList', 2, 'auditStatus']}
            width="sm"
            options={PASS_OR_NOTPASS_OPTIONS}
          />
          {show3 && (
            <ProFormText
              name={['certificateList', 2, 'refuseReason']}
              placeholder="请输入不通过原因"
              rules={[{ required: true, message: '请输入不通过原因' }]}
            />
          )}
        </Visible>
        <ProFormUploadButton
          width="sm"
          disabled
          label="健康证照片"
          title="点击上传"
          name="HEALTH"
          fieldProps={{
            onPreview: handlePreview,
          }}
          rules={[{ required: true, message: '请上传健康证' }]}
          action="upload.do"
          onChange={() => {}}
          max={1}
          listType="picture-card"
        />
        <Visible visible={!isDetail}>
          <ProFormRadio.Group
            width="sm"
            name={['certificateList', 3, 'auditStatus']}
            options={PASS_OR_NOTPASS_OPTIONS}
          />
          {show4 && (
            <ProFormText
              placeholder="请输入不通过原因"
              name={['certificateList', 3, 'refuseReason']}
              rules={[{ required: true, message: '请输入不通过原因' }]}
            />
          )}
        </Visible>

        <ProFormUploadButton
          width="sm"
          label="从业资格证"
          title="点击上传"
          name="PROFESSION"
          fieldProps={{
            onPreview: handlePreview,
          }}
          disabled
          rules={[{ required: true, message: '请上传从业资格证照片' }]}
          action="upload.do"
          onChange={() => {}}
          max={1}
          listType="picture-card"
        />
        <Visible visible={!isDetail}>
          <ProFormRadio.Group
            width="sm"
            name={['certificateList', 4, 'auditStatus']}
            options={PASS_OR_NOTPASS_OPTIONS}
          />
          {show5 && (
            <ProFormText
              name={['certificateList', 4, 'refuseReason']}
              placeholder="请输入不通过原因"
              rules={[{ required: true, message: '请输入不通过原因' }]}
            />
          )}
        </Visible>
        <ProFormUploadButton
          width="sm"
          title="点击上传"
          label="其他证件照片"
          name="OTHER"
          disabled
          fieldProps={{
            onPreview: handlePreview,
          }}
          max={3}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <Visible visible={!isDetail}>
          <ProFormRadio.Group
            name={['certificateList', 5, 'auditStatus']}
            width="sm"
            options={PASS_OR_NOTPASS_OPTIONS}
          />
          {show6 && (
            <ProFormText
              name={['certificateList', 5, 'refuseReason']}
              placeholder="请输入不通过原因"
              rules={[{ required: true, message: '请输入不通过原因' }]}
            />
          )}
        </Visible>
      </ProFormGroup>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </ModalForm>
  );
};

export default MassagerInfo;
