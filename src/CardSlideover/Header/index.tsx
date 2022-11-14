import { cx } from '../../util';
import css from './style.module.scss';
import Image, { IMAGE_FRAGMENT } from '../../Image';
import { gql, useMutation } from 'urql';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import { Emit, Signal } from '../../util/signals';
import Dropzone from '../../Dropzone';
import Spinner from '../../Spinner';

export const CARD_SLIDEOVER_HEADER_FRAGMENT = gql`
	fragment CardSlideoverHeader on Card {
		id
		name
		type
        coverImage: image {
            id
            srcset (
                width: 600
                height: 280
            ) {
                ...Image
            }
        }
	}
	${IMAGE_FRAGMENT}
`;

export default function Header ({
	readOnly = false,
	id, type, coverImage, name,
}) {
	const { t } = useTranslation();
	const ta = useRef();

	const [{ fetching: uploading }, upload] = useMutation(gql`
		mutation UploadCover (
			$id: UUID!
			$cover: Upload!
		) {
			updateCard (input: {
				id: $id
				patch: { image: { create: { file: $cover } } }
			}) {
				card {
					...CardSlideoverHeader
                }
			}
		}
		${CARD_SLIDEOVER_HEADER_FRAGMENT}
	`);

	const [, save] = useMutation(gql`
		mutation SaveCardName (
			$id: UUID!
			$name: String!
		) {
			updateCard (input: {
				id: $id
				patch: { name: $name }
			}) {
                card {
                    id
	                name
                }
			}
		}
	`);

	const onChange = useCallback(debounce(async e => {
		const { error } = await save({
			id,
			name: e.target.value.trim(),
		});

		if (error) Emit(
			Signal.Notify,
			t('save_failed', 'Failed to Save'),
			'error',
			t('card_name_save_failed', 'Unable to save card name')
		);
	}, 500), []);

	const uploadFiles = async files => {
		const { error } = await upload({
			id,
			cover: files[0],
		});

		if (error) Emit(
			Signal.Notify,
			t('save_failed', 'Failed to Save'),
			'error',
			t('card_cover_upload_failed', 'Unable to upload cover image')
		);
	};

	const onInput = e => {
		e.target.value = e.target.value.replace(/\r?\n|\r/g, '');
		e.target.style.height = '';
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	const onFileChange = async e => await uploadFiles(e.target.files);

	useEffect(() => {
		if (!ta.current) return;

		const target = ta.current as HTMLTextAreaElement;
		target.value = name;
		onInput({ target });
	}, [ta, name]);

	return (
		<Dropzone
			El="header"
			className={cx(
				css.header,
				css[type.toLowerCase()],
				uploading && css.uploading,
			)}
			accept="image/png,image/jpeg"
			hoverClassName={css.dragover}
			onChange={uploadFiles}
		>
			{coverImage ? <Image {...coverImage.srcset} /> : (
				<label className={css.placeholder}>
					<input
						type="file" onChange={onFileChange}
						accept="image/png,image/jpeg"
					/>
					<Spinner white className={css.spinner} />
					<span>{t('cover_image_placeholder', 'Upload or search for a picture')}</span>
				</label>
			)}

			{readOnly ? (
				<h2>{name}</h2>
			) : (
				<textarea
					ref={ta}
					defaultValue={name}
					onInput={onInput}
					onChange={onChange}
					rows={1}
				/>
			)}
		</Dropzone>
	);
}
