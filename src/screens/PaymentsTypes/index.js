import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import firebase from "../../../Servers/FirebaseConect";
import { AntDesign } from "@expo/vector-icons";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";

import styles from "./style";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [lote, setLote] = useState("");
  const [numero, setNumero] = useState("");
  const [condominio, setCondominio] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao, setObservacao] = useState("");
  const [typePayment, setTypePayment] = useState("");
  const [troco, setTroco] = useState("");
  const [status, setStatus] = useState("Aguardando");
  const [uploading, setUploading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [nome, setNome] = useState();
  const [contato, setContato] = useState();
  const { user } = useContext(AuthContext);
  const { cart, hendleSaveuidloja } = useCart();
  console.log(cart);

  useEffect(() => {
    setNome(user.complemento.nome);
    setContato(user.complemento.telefone);
  }, [nome, contato]);

  const unidadesMedida = [
    { label: "Sim", value: "Sim" },
    { label: "Não", value: "Não" },
  ];

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setShowOptions(false);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleClear = () => {
    setTypePayment("");
    setStep(1);
  };

  const handleStoreUid = (storeUid) => {
    hendleSaveuidloja(storeUid);
  }

  const handleUpload = async (cartItems) => {
    try {
      // Recuperar o UID da loja do primeiro item do carrinho (supondo que todos os itens do carrinho tenham o mesmo UID da loja)
      const storeUid = cartItems[0].identify;
      handleStoreUid(storeUid);
  
      // Criar uma referência para o nó da loja onde os pedidos serão armazenados
      const storePath = `lojas/${user.complemento.cidade}/${storeUid}/pedidos/${user.uid}`;
  
      // Criar uma nova referência para o pedido dentro do nó da loja
      const newOrderRef = firebase.database().ref(storePath).push();
  
      // Função para gerar um código aleatório de 4 dígitos
      const generateRandomCode = () => {
        const min = 1000; // Menor número de 4 dígitos (1000)
        const max = 9999; // Maior número de 4 dígitos (9999)
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
  
      // Gerar o código aleatório
      const randomCode = generateRandomCode();
  
      // Verifica se todos os itens do carrinho têm o campo 'uid' definido
      const allItemsHaveUid = cartItems.every((item) => item.identify !== undefined);
  
      if (!allItemsHaveUid) {
        throw new Error("Todos os itens do carrinho devem ter um UID definido.");
      }
  
      // Iterar sobre os itens do carrinho para enviar cada pedido para o nó da loja proprietária
      const itemsData = cartItems.map((item) => ({
        productId: item.id,
        descricao: item.descricao,
        price: item.price,
        selectedOption: item.selectedOption,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        // Adicione outros detalhes do item aqui conforme necessário
      }));
  
      await newOrderRef.set({
        
        status: "Aguardando", // Indicação de status
        codigo: randomCode, // Geração de código aleatório
        items: itemsData, // Adiciona os detalhes dos itens ao pedido
        // Outros campos do pedido que você deseja salvar
      });
  
      Alert.alert("Sucesso", "Pedido(s) cadastrado(s) com sucesso!");
      // Limpar os dados do formulário
      setCidade("");
      setBairro("");
      setLote("");
      setNumero("");
      setTelefone("");
      setCondominio("");
      setObservacao("");
      setSelectedOption("");
      setTypePayment("");
      setTroco("");
      setStatus("");
      setShowOptions("");
      setStep(1);
    } catch (error) {
      console.error("Erro ao enviar o pedido:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao enviar o pedido. Por favor, tente novamente."
      );
    }
  };
  
  
  

  const progressStepsStyle = {
    activeStepIconBorderColor: "#0a0d64",
    activeLabelColor: "#0a0d64",
    activeStepNumColor: "white",
    activeStepIconColor: "#0a0d64",
    completedStepIconColor: "#0a0d64",
    completedProgressBarColor: "#0a0d64",
    completedCheckColor: "white",
  };

  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps {...progressStepsStyle} activeStep={step - 1}>
        <ProgressStep
          label="Forma de pagamento"
          removeBtnRow={true}
          nextBtnDisabled={!typePayment}
        >
          <View style={{ flex: 1, height: 120, alignItems: "center" }}>
            {!typePayment && (
              <View style={styles.message_container}>
                <Text style={styles.text_dialog}>
                  Escolha uma forma de pagamento.
                </Text>
              </View>
            )}
            {typePayment && (
              <View style={styles.message_container}>
                <Text style={styles.text_dialog}>
                  Perfeito, forma de pagamento selecionada {typePayment}, toque
                  em avançar no fim da tela.
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              height: "auto",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            {typePayment === "" || typePayment === "pix" ? (
              <TouchableOpacity
                style={styles.btnselect}
                onPress={() => setTypePayment("pix")}
              >
                <Text>Pix</Text>
              </TouchableOpacity>
            ) : null}

            {typePayment === "" || typePayment === "dinheiro" ? (
              <TouchableOpacity
                style={styles.btnselect}
                onPress={() => setTypePayment("dinheiro")}
              >
                <Text>Dinheiro</Text>
              </TouchableOpacity>
            ) : null}
            {typePayment === "" || typePayment === "credito" ? (
              <TouchableOpacity
                style={styles.btnselect}
                onPress={() => setTypePayment("credito")}
              >
                <Text>Crédito/Débito</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
            {typePayment && <Button title="Cancelar" onPress={handleClear} />}
          </View>
          <View style={styles.cont_bar}>
            {typePayment && step > 1 ? (
              <Button title="Etapa Anterior" onPress={handlePreviousStep} />
            ) : (
              <Button
                title="Sair"
                onPress={() => navigation.navigate("Home")}
              />
            )}

            <Button
              title="Avançar"
              onPress={handleNextStep}
              disabled={!typePayment}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Etapa 2"
          removeBtnRow={true}
          nextBtnDisabled={!typePayment}
        >
          <View style={{ flex: 1, padding: 20 }}>
            <View style={styles.message_container}>
              <Text style={styles.text_dialog}>
                Selecione um endereço para a entrega, ou adicione um novo.
              </Text>
            </View>
            <View>
              <Text>Endereço cadastrado aqui</Text>
            </View>
            <View style={{ flex: 1, padding: 20 }}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
              ></Text>
              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="Cidade"
                value={cidade}
                onChangeText={setCidade}
              />

              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="Bairro"
                value={bairro}
                onChangeText={setBairro}
              />
              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="Lote"
                value={lote}
                onChangeText={setLote}
              />
              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="numero"
                value={numero}
                onChangeText={setNumero}
              />
              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="Condominio"
                value={condominio}
                onChangeText={setCondominio}
              />
              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="Observação"
                value={observacao}
                onChangeText={setObservacao}
                maxLength={92}
              />
              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="telefone"
                value={telefone}
                onChangeText={setTelefone}
              />
              <View>
                <View
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      marginLeft: 5,
                    }}
                    onPress={toggleOptions}
                  >
                    <Text>{selectedOption || "Selecione uma opção"}</Text>
                  </TouchableOpacity>

                  <TextInput
                    style={{
                      flex: 1,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      marginRight: 5,
                    }}
                    placeholder="Troco"
                    value={troco}
                    onChangeText={setTroco}
                    keyboardType="numeric"
                  />
                </View>
                {showOptions && (
                  <View style={styles.dropdownOptions}>
                    {unidadesMedida.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.option}
                        onPress={() => handleOptionSelect(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.cont_bar}>
            <Button title="Etapa Anterior" onPress={handlePreviousStep} />
            <Button
              title="Próxima Etapa"
              onPress={handleNextStep}
              disabled={!typePayment}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Etapa 3"
          removeBtnRow={true}
          nextBtnDisabled={!typePayment}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, padding: 20 }}>
            <View style={styles.message_container}>
              <Text style={styles.text_dialog}>
                Confirme as informações do pedido antes de prosseguir.
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Tipo de Pagamento:
              </Text>
              <Text>{typePayment}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Endereço:
              </Text>
              <Text>Cidade: {cidade}</Text>
              <Text>Bairro: {bairro}</Text>
              <Text>Lote: {lote}</Text>
              <Text>Número: {numero}</Text>
              <Text>Condomínio: {condominio}</Text>
            </View>
            {typePayment === "pix" && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  Detalhes do Pagamento PIX:
                </Text>
                {paymentDetails ? (
                  <>
                    <Text>Valor: R${paymentDetails.valor}</Text>
                    <Text>Chave PIX: {paymentDetails.chavePix}</Text>
                  </>
                ) : (
                  <ActivityIndicator />
                )}
              </View>
            )}
            <View style={styles.cont_bar}>
              <Button title="Etapa Anterior" onPress={handlePreviousStep} />
              <Button
                title="Confirmar Pedido"
                onPress={() => handleUpload(cart)}
                disabled={!typePayment || !cidade}
              />
            </View>
          </View>
        </ProgressStep>

        <ProgressStep label="Etapa 4">
          <View
            style={{
              flex: 1,
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {typePayment === "pix" ? (
              <View style={{ alignItems: "center" }}>
                <AntDesign name="checkcircleo" size={24} color="black" />
                <Text style={{ marginTop: 20 }}>
                  Pagamento efetuado com sucesso!
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                {uploading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <>
                    <Text>Pedido enviado com sucesso!</Text>
                    <Button
                      title="Voltar para a tela inicial"
                      onPress={() => navigation.navigate("Home")}
                    />
                  </>
                )}
              </View>
            )}
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default PaymentScreen;
