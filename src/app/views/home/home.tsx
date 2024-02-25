import { useState } from 'react';
import styles from './home.module.scss';
import ExpandableTextComponent from 'src/app/library/components/expandable-text/expandable-text';

const Home = () => {
    const [game, setGame] = useState({
        id: 1,
        player: {
            name: 'John',
        },
    });

    const [pizza, setPizza] = useState({
        name: 'Spicy Pepperoni',
        toppings: ['Mushroom'],
    });

    const [cart, setCart] = useState({
        discount: 0.1,
        items: [
            { id: 1, product: 'P1', quantity: 1 },
            { id: 2, product: 'P2', quantity: 2 },
        ],
    });

    const handleClick = () => {
        setGame({ ...game, id: 2, player: { ...game.player, name: 'valerio' } });
        setPizza({ ...pizza, toppings: [...pizza.toppings, 'Cheese'] });
        setCart({
            ...cart,
            items: cart.items.map((item) => ({
                ...item,
                quantity: item.id === 1 ? 99 : item.quantity,
            })),
        });
    };

    const textProps = {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nihil, maiores itaque, earum eos optio voluptates iure saepe cumque consequatur eum quidem blanditiis qui, neque reiciendis dicta? Eos totam porro harum? Cupiditate perspiciatis deleniti obcaecati molestias nulla ratione culpa et? Laborum eveniet sint soluta doloribus, aut exercitationem iste numquam fuga. Tempora ad natus necessitatibus reiciendis voluptatem harum eum quod recusandae quam nesciunt! Neque incidunt aperiam numquam temporibus officia iste error consequatur at corporis ratione? Facere, consequuntur eaque soluta saepe perferendis praesentium suscipit voluptate consectetur quia aliquam et iusto debitis beatae, provident optio maxime assumenda officia nesciunt ea veniam id repudiandae reiciendis, vitae dolorem. Saepe rem sunt eveniet molestiae quis tempora ratione praesentium est sequi nulla iste necessitatibus corrupti, vitae amet a! Et expedita omnis harum ullam at, quod magni, officiis nostrum consectetur libero consequuntur sequi unde ipsam ipsa rem recusandae quo aliquid vero soluta voluptatibus deserunt. Rem voluptatem hic eveniet omnis blanditiis doloribus esse totam rerum? Voluptatibus assumenda nisi numquam illo totam, tenetur expedita quasi nemo facilis qui natus vero. Illo quod harum est necessitatibus rerum, voluptatem error voluptas, sequi reprehenderit distinctio maiores at dolor aspernatur. Reiciendis pariatur, iure eaque fuga dolore, placeat vel tempore perspiciatis odio necessitatibus harum a, voluptatum ipsum! Corporis odio, veritatis rem iure ipsa accusamus dolor placeat excepturi quam nobis quidem incidunt est beatae aliquid tenetur dolores consequuntur. Quasi, veniam atque. Expedita porro molestiae alias magnam possimus minima voluptatum eos ab, odio quod ullam nostrum ex dignissimos natus dolorum consequatur nobis tempora quia delectus laudantium! Veritatis et deleniti obcaecati, tempore inventore debitis, laudantium quisquam repellat, fugit nostrum cum. Facere tempora fugit nihil dolores est veniam debitis earum, in necessitatibus sit ad quidem aspernatur deserunt quos dolore cum perspiciatis, dolorem beatae eum? Quas officiis eveniet quos provident eaque sint harum aperiam deleniti sit repellendus? Nam consequuntur facere aperiam vel et possimus fugit veritatis, nobis omnis quia quisquam quis voluptas officia. Quisquam repudiandae iusto quo non reprehenderit suscipit totam, eligendi debitis ipsam aspernatur laboriosam, enim quasi nam atque? Illo rem tempora explicabo sit suscipit sint, harum unde? Iste quibusdam dicta necessitatibus nihil magni quam, nostrum placeat. Voluptas, amet perferendis praesentium, a illo architecto minima fugit voluptate iste laudantium ipsa libero sint unde id quibusdam eligendi quam provident eaque veniam? Nisi fugit optio iusto debitis dicta atque doloribus tenetur modi a magnam pariatur inventore impedit explicabo voluptas, quaerat minima laboriosam saepe laudantium nobis sit expedita praesentium ullam laborum. Incidunt et magnam similique vitae sunt saepe distinctio cumque itaque corrupti harum consequuntur alias, ratione maxime sapiente blanditiis recusandae quidem veritatis dolores unde ducimus! Doloribus atque amet quasi aperiam quos, suscipit nemo temporibus, neque, corrupti asperiores pariatur ea eius ad incidunt? Harum vitae, facere explicabo nemo ipsam incidunt nihil fugit voluptas, perferendis reprehenderit quisquam nostrum magnam aliquid, quos sequi exercitationem? Cum odio a provident necessitatibus, odit tempora commodi inventore ex alias nihil, saepe distinctio. Nam, delectus quam sit atque, laudantium tempore alias nisi tempora quis a voluptatum unde omnis quibusdam, culpa ea placeat quaerat vero aspernatur inventore voluptatibus odit quos maiores?',
        maxLength: 550,
    };

    return (
        <div className={styles['container']}>
            <h1>Welcome to Home!</h1>

            <p>{JSON.stringify(game)}</p>
            <p>{JSON.stringify(pizza)}</p>
            <p>{JSON.stringify(cart)}</p>

            <button className="btn btn-primary" onClick={handleClick}>
                update
            </button>

            <ExpandableTextComponent {...textProps} />
        </div>
    );
};

export default Home;
