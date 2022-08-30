import css from './style.module.scss';
import Card from '../../Card';
import Button from '../../Button';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Header from '../Header';
import ColumnDragHandle from '../../svg/column-drag-handle.svg';
import { useRef } from 'react';

export default function Column ({ day, hasStartDate, cards }) {
	const self = useRef();

	return (
		<div className={css.column} ref={self}>
			<Header
				hasStartDate={hasStartDate}
				label={day.label}
			/>

			<Draggable draggableId={`col_${day.index}`} index={day.index}>
				{dragProvided => {
					const style = dragProvided.draggableProps.style;
					// const colWidth = self.current ? +window.getComputedStyle(self.current).width.replace('px', '') : 0;
					//
					// if (style.position !== 'fixed' && style.transform) {
					// 	const x = +style.transform?.replace('translate(', '')?.split('p', 2)?.[0];
					// 	console.log(x, colWidth);
					// 	style.transform = `translate(${x - colWidth}px, 0px)`;
					// }


					return (
						<div
							ref={dragProvided.innerRef}
							{...dragProvided.draggableProps}
							style={style}
						>
							<Droppable
								droppableId={`day_${day.index}`}
								type="card"
							>
								{provided => (
									<>
										<div {...dragProvided.dragHandleProps}>
											<ColumnDragHandle />
										</div>
										<ul
											className={css.list}
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{cards.map((card, i) => (
												<Draggable key={card.id} draggableId={card.id} index={i}>
													{provided => (
														<li
															key={card.id}
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<Card {...card} />
														</li>
													)}
												</Draggable>
											))}
											{provided.placeholder}
											<li className={css.add}><Button wide flat>+ New Card</Button></li>
										</ul>
									</>
								)}
							</Droppable>
						</div>
					);
				}}
			</Draggable>
		</div>
	);
}
